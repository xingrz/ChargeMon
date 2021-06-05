import { EventEmitter, once } from 'events';
import SerialPort from '@serialport/stream';
import WSABinding from 'serialport-binding-webserialapi';

// @ts-ignore
SerialPort.Binding = WSABinding;

export interface IYZXMessage {
  v: number;
  a: number;
  ah: number;
  wh: number;
  t: number;
  dn: number;
  dp: number;
}

export default class YZX extends EventEmitter {

  serial: SerialPort | null = null;
  buffer = Buffer.alloc(0);

  static async open(path: string): Promise<YZX> {
    const instance = new YZX();
    await instance.open(path);
    return instance;
  }

  private async open(path: string): Promise<void> {
    this.serial = new SerialPort(path, {
      baudRate: 115200,
      autoOpen: false,
    });

    this.serial.on('data', this.handleData.bind(this));
    this.serial.open();

    try {
      await once(this.serial, 'open');
    } catch (e) {
      if (this.serial && this.serial.isOpen) {
        this.serial.close();
      }
      this.serial = null;
      throw e;
    }
  }

  async close(): Promise<void> {
    if (this.serial) {
      this.serial.close();
      await once(this.serial, 'close');
    }
  }

  private handleData(data: Buffer): void {
    this.buffer = Buffer.concat([this.buffer, data]);

    if (this.buffer.length < 28) return;
    while (this.buffer[0] != 0xAB) {
      this.buffer = this.buffer.slice(1);
      if (this.buffer.length < 28) return;
    }

    let chk = 0;
    for (let i = 0; i < 27; i++) {
      chk = (chk + this.buffer[i]) & 0xFF;
    }

    if (chk == this.buffer[27]) {
      const msg: IYZXMessage = {
        v: this.buffer.readInt32LE(3) / 10000,
        a: this.buffer.readInt32LE(7) / 10000,
        ah: this.buffer.readUInt32LE(11) / 10000,
        wh: this.buffer.readUInt32LE(15) / 10000,
        t: this.buffer.readUInt32LE(19),
        dn: this.buffer.readUInt16LE(23) / 1000,
        dp: this.buffer.readUInt16LE(25) / 1000,
      }
      this.emit('data', msg);
    }

    this.buffer = this.buffer.slice(28);
  }

}
