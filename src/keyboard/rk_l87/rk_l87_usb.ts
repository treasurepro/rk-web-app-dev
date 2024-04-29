import type { KeyboardState  } from '../interface'
import { REPORT_ID_USB, MACRO_PER_BLOCK_LENGTH } from './packets/packet';
import type { MaxtrixLayer, MaxtrixTable } from './keyMaxtrix';
import { ConnectionType } from '../enum';
import { RK_L87, RK_L87_EVENT_DEFINE } from './rk_l87';

import { GetProfilePacket } from './packets/usb/getProfilePacket';
import { SetProfilePacket } from './packets/usb/setProfilePacket';

import { GetLedColorsPacket } from './packets/usb/getLedColorsPacket';
import { SetLedColorsPacket } from './packets/usb/setLedColorsPacket';

import { GetKeyMaxtrixPacket } from './packets/usb/getKeyMaxtrixPacket';
import { SetKeyMaxtrixPacket } from './packets/usb/setKeyMaxtrixPacket';

import { GetMacrosPacket } from './packets/usb/getMacrosPacket';
import { SetMacrosPacket } from './packets/usb/setMacrosPacket';

export class RK_L87_Usb extends RK_L87 {

    constructor(state: KeyboardState, device: HIDDevice) {
        super(state, device);
        state.connectType = ConnectionType.USB;
    }

    static async create(state: KeyboardState, device: HIDDevice) {
        return new RK_L87_Usb(state, device);
    }
    
    async onGetReport(reportId: number, data: DataView): Promise<void> {

    }

    async getProfile(board: number): Promise<void> {
        let packet = new GetProfilePacket(board);

        await this.setFeature(REPORT_ID_USB, packet.setReport);
        packet.fromReportData(await this.getFeature(REPORT_ID_USB));

        this.data.profile = packet.profile;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnProfileGotten, { detail: this.data.profile }));
    }

    async setProfile(board: number): Promise<void> {
        if (this.data.profile != undefined) {
            let packet = new SetProfilePacket(board);
            packet.setPayload(this.data.profile.buffer);
            await this.setFeature(REPORT_ID_USB, packet.setReport);
        }
    }

    async getLedColors(board: number): Promise<void> {
        let packet = new GetLedColorsPacket(board);

        await this.setFeature(REPORT_ID_USB, packet.setReport);
        packet.fromReportData(await this.getFeature(REPORT_ID_USB));

        this.data.ledColors = packet.ledColors;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnLedColorsGotten, { detail: this.data.ledColors }));
    }

    async setLedColors(board: number): Promise<void> {
        if (this.data.ledColors != undefined) {
            let packet = new SetLedColorsPacket(board);
            packet.setPayload(this.data.ledColors.buffer);
            await this.setFeature(REPORT_ID_USB, packet.setReport);
        }
    }

    async getKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void> {
        let packet = new GetKeyMaxtrixPacket(layer, table, board);

        await this.setFeature(REPORT_ID_USB, packet.setReport);
        packet.fromReportData(await this.getFeature(REPORT_ID_USB));

        this.data.keyMaxtrix = packet.keyMaxtrix;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnKeyMaxtrixGotten, { detail: this.data.keyMaxtrix }));
    }

    async setKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void> {
        if (this.data.keyMaxtrix != undefined) {
            let packet = new SetKeyMaxtrixPacket(layer, table, board);
            packet.setPayload(this.data.keyMaxtrix.buffer);
            await this.setFeature(REPORT_ID_USB, packet.setReport);
        }
    }

    async getMacros(): Promise<void> {
        let packet = new GetMacrosPacket(0x00);

        await this.setFeature(REPORT_ID_USB, packet.setReport);
        packet.fromReportData(await this.getFeature(REPORT_ID_USB));

        this.data.macros = packet.macros;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnMacrosGotten, { detail: this.data.macros }));
    }

    async setMacros(block: number): Promise<void> {
        if (this.data.macros != undefined) {
            let packet = new SetMacrosPacket();
            let u8 = this.data.macros?.serialize();
            
            let pkgs = new Array<DataView>();
            let index = 0;
            do {
                let end = index + MACRO_PER_BLOCK_LENGTH > u8.length ? u8.length : index + MACRO_PER_BLOCK_LENGTH;
                pkgs.push(new DataView(u8.subarray(index, end).buffer));
                index = end + 1;
            } while (index < u8.length)

            packet.packageNum = pkgs.length;
            index = 0;
            for (let pkg of pkgs) {
                packet.packageIndex = index;
                packet.setPayload(pkg);
                await this.setFeature(REPORT_ID_USB, packet.setReport);
            }
        }
    }
}