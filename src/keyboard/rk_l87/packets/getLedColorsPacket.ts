import type { IPacket } from "../../interface";
import { Packet, LED_COLOR_LENGTH, LED_EFFECT_COLOR_COUNT, LED_EFFECT_COUNT, PACKET_HEAD_LENGTH } from "../packet";
import { LedColors } from "../ledColors";

export class GetLedColorsPacket extends Packet {

    setReport: Uint8Array;
    getReport?: DataView;
    ledColors?: LedColors;

    constructor() {
        super(0x8a);
        this.cmdVal = 0x00;
        this.dataLength = LED_COLOR_LENGTH * LED_EFFECT_COLOR_COUNT * LED_EFFECT_COUNT;
        this.setReport = new Uint8Array(519);
        this.setReport[0] = this.cmdId;
        this.setReport[2] = this.cmdVal;
        this.setReport[3] = 0x01;
        this.setReport[5] = this.dataLength & 0x00FF;
        this.setReport[6] = this.dataLength >> 8;
    }

    fromReportData(buffer: DataView) : IPacket {
        super.fromReportData(buffer);
        this.getReport = new DataView(buffer.buffer.slice(1, this.dataLength + PACKET_HEAD_LENGTH + 1));
        this.ledColors = LedColors.fromReportData(this.getReport);

        return this;
    }
}