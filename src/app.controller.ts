import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Socket } from 'net';
import * as Modbus from 'jsmodbus';
import { Interval } from '@nestjs/schedule';

@Controller()
export class AppController {
  private modbusValue = 0;
  private client: any;
  private socket: Socket;
  private connected = false

  constructor(private readonly appService: AppService) {
    this.initializeModbusClient();
  }

  @Get()
  getModbusValue() {
    return this.modbusValue;
  }

  @Interval(100)
  async readModbusValue() {
    if (!this.connected) {
      console.warn('Modbus client is not connected.');
      return;
    }

    try {
      const response = await this.client.readDiscreteInputs(2, 1);
      this.modbusValue = response.response._body.valuesAsArray[0];
      console.log(this.modbusValue)
    } catch (error) {
      console.error('Error reading Modbus value:', error);
      this.connected = false;
      this.initializeModbusClient();
    }
  }
  
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  private initializeModbusClient() {
    if (this.socket) {
      this.socket.destroy();
    }

    this.socket = new Socket();
    this.client = new Modbus.client.TCP(this.socket, 1); // Unit ID is 1

    this.socket.on('connect', () => {
      console.log('Modbus client connected.');
      this.connected = true;
    });

    this.socket.on('error', (error) => {
      console.error('Modbus client error:', error);
      this.connected = false;
      setTimeout(() => this.initializeModbusClient(), 5000); // Retry connection after 5 seconds
    });

    this.socket.on('close', () => {
      console.log('Modbus client connection closed.');
      this.connected = false;
      setTimeout(() => this.initializeModbusClient(), 5000); // Retry connection after 5 seconds
    });

    this.socket.connect({ host: '192.168.1.4', port: 502 });
  }
}
