import type { KeyboardState } from '../interface'
import { ConnectionStatusEnum, ConnectionType, KeyMatrixLayer } from '../enum';
import { Packet_Dongle, REPORT_ID_DONGLE, REPORT_MAX_RETRY, MACRO_PER_BLOCK_LENGTH, MACRO_MAX_LENGTH } from './packets/packet';
import { Packet_Dongle_Block_Set } from './packets/dongle/setPacket';

import type { KeyMatrix, MatrixTable } from './keyMatrix';
import { RK_L87, COMMAND_ID, RK_L87_EVENT_DEFINE } from './rk_l87';

import type { BoardProfile } from './boardProfile';
import type { LedEffect } from './ledEffect';
import type { Macros } from './macros';
import type { LedColors } from './ledColors'

import { GetLedEffectPacket } from './packets/dongle/getLedEffectPacket';
import { GetLedColorsPacket } from './packets/dongle/getLedColorsPacket';
import { GetPasswordPacket } from './packets/dongle/getPasswordPacket';
import { GetProfilePacket } from './packets/dongle/getProfilePacket';
import { GetDongleStatusPacket } from './packets/dongle/getDongleStatusPacket';
import { GetKeyMatrixPacket } from './packets/dongle/getKeyMatrixPacket';
import { GetMacrosPacket } from './packets/dongle/getMacrosPacket';

import { SetProfilePacket } from './packets/dongle/setProfilePacket';
import { SetLedEffectPacket } from './packets/dongle/setLedEffectPacket';
import { SetLedColorsPacket } from './packets/dongle/setLedColorsPacket';
import { SetKeyMatrixPacket } from './packets/dongle/setKeyMatrixPacket';
import { SetMacrosPacket } from './packets/dongle/setMacrosPacket';
import { SetFactoryPacket } from './packets/dongle/setFactoryPacket';


export class RK_L87_Dongle extends RK_L87 {

    pktGetDongleStatus: GetDongleStatusPacket;
    pktGetPassword: GetPasswordPacket;
    pktGetProfile: GetProfilePacket;
    pktGetLedEffect: GetLedEffectPacket;
    pktGetLedColors: GetLedColorsPacket;
    pktGetKeyMatrix: GetKeyMatrixPacket;
    pktGetMacros: GetMacrosPacket;
    pktSetProfile: SetProfilePacket;
    pktSetLedEffect: SetLedEffectPacket;
    pktSetLedColors: SetLedColorsPacket;
    pktSetKeyMatrix: SetKeyMatrixPacket;
    pktSetMacros: SetMacrosPacket;
    pktSetFactory: SetFactoryPacket;

    constructor(state: KeyboardState, device: HIDDevice) {
        super(state, device);
        state.connectType = ConnectionType.Dongle;

        this.pktGetDongleStatus = new GetDongleStatusPacket(this.dongleStatusReport.bind(this));
        this.pktGetPassword = new GetPasswordPacket(this.passwordReport.bind(this));
        this.pktGetProfile = new GetProfilePacket(this.getProfileReport.bind(this));
        this.pktGetLedEffect = new GetLedEffectPacket(this.getLedEffectReport.bind(this));
        this.pktGetLedColors = new GetLedColorsPacket(this.getLedColorsReport.bind(this));
        this.pktGetKeyMatrix = new GetKeyMatrixPacket(this.getKeyMatrixReport.bind(this));
        this.pktGetMacros = new GetMacrosPacket(this.getMacrosReport.bind(this));
        this.pktSetProfile = new SetProfilePacket(this.nextReport.bind(this));
        this.pktSetLedEffect = new SetLedEffectPacket(this.nextReport.bind(this));
        this.pktSetLedColors = new SetLedColorsPacket(this.nextReport.bind(this));
        this.pktSetKeyMatrix = new SetKeyMatrixPacket(this.nextReport.bind(this));
        this.pktSetMacros = new SetMacrosPacket(this.nextReport.bind(this), this.nextBlock.bind(this));
        this.pktSetFactory = new SetFactoryPacket(this.setFactoryReport.bind(this));
    }

    static async create(state: KeyboardState, device: HIDDevice) {
        return new RK_L87_Dongle(state, device);
    }

    async init(): Promise<void> {
        super.init();
        await this.getDongleStatus();
    }

    async onGetReport(reportId: number, data: DataView): Promise<void> {
        if (data.byteLength == 19 && reportId == REPORT_ID_DONGLE) {
            let cmd = data.getUint8(0);
            //let packet: Packet_Dongle | null = null;
            switch (cmd) {
                case COMMAND_ID.ActivelyReport:
                    this.activelyReport(data);
                    break;
                case COMMAND_ID.GetDongleStatus:
                    this.pktGetDongleStatus.fromReportData(data);
                    break;
                case COMMAND_ID.GetPassword:
                    this.pktGetPassword.fromReportData(data);
                    break;
                case COMMAND_ID.GetProfile:
                    this.pktGetProfile.fromReportData(data);
                    break;
                case COMMAND_ID.GetLedEffect:
                    this.pktGetLedEffect.fromReportData(data);
                    break;
                case COMMAND_ID.GetLedColors:
                    this.pktGetLedColors.fromReportData(data);
                    break;
                case COMMAND_ID.GetKeyMatrix:
                    this.pktGetKeyMatrix.fromReportData(data);
                    break;
                case COMMAND_ID.GetMacros:
                    this.pktGetMacros.fromReportData(data);
                    if (this.pktGetMacros.packageNum - 1 == this.pktGetMacros.packageIndex && this.pktGetMacros.block < this.pktGetMacros.blockCount) {
                        await this.setReport(REPORT_ID_DONGLE, this.pktGetMacros.command());
                    }
                    break;
                case COMMAND_ID.SetProfile:
                    this.pktSetProfile.fromReportData(data);
                    break;
                case COMMAND_ID.SetLedEffect:
                    this.pktSetLedEffect.fromReportData(data);
                    break;
                case COMMAND_ID.SetLedColors:
                    this.pktSetLedColors.fromReportData(data);
                    break;
                case COMMAND_ID.SetKeyMatrix:
                    this.pktSetKeyMatrix.fromReportData(data);
                    break;
                case COMMAND_ID.SetMacros:
                    this.pktSetMacros.fromReportData(data);
                    break;
            }
        }
    }

    activelyReport(data: DataView): void {
        let id = data.getUint8(4);
        let val = data.getUint8(5);
        switch (id) {
            case 0x02:
                this.state.ConnectionStatus = val == 1 ? ConnectionStatusEnum.Connected : ConnectionStatusEnum.Disconnected;
                this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnDongleStatusChanged, { detail: this.state.ConnectionStatus }));
                break;
        }
    }

    async getDongleStatus(): Promise<void> {
        await this.setReport(REPORT_ID_DONGLE, this.pktGetDongleStatus.command());
    }

    async getPassword(): Promise<void> {
        await this.setReport(REPORT_ID_DONGLE, this.pktGetPassword.command());
    }

    async getProfile(board: number): Promise<void> {
        this.pktGetProfile.board = board;
        await this.setReport(REPORT_ID_DONGLE, this.pktGetProfile.command());
    }

    async setProfile(board: number): Promise<void> {
        if (this.data.boardProfile != undefined) {
            this.pktSetProfile.board = board;
            this.pktSetProfile.packageIndex = 0;
            this.pktSetProfile.retry = REPORT_MAX_RETRY;
            this.pktSetProfile.buffer = new Uint8Array(this.data.boardProfile?.buffer.buffer.slice(0, this.data.boardProfile?.buffer.byteLength));
            await this.setReport(REPORT_ID_DONGLE, this.pktSetProfile.command());
        }
    }

    async getLedEffect(board: number): Promise<void> {
        this.pktGetLedEffect.board = board;
        await this.setReport(REPORT_ID_DONGLE, this.pktGetLedEffect.command());
    }

    async setLedEffect(board: number): Promise<void> {
        if (this.data.ledEffect != undefined) {
            this.pktSetLedEffect.board = board;
            this.pktSetLedEffect.packageIndex = 0;
            this.pktSetLedEffect.retry = REPORT_MAX_RETRY;
            this.pktSetLedEffect.buffer = new Uint8Array(this.data.ledEffect?.buffer.buffer.slice(0, this.data.ledEffect?.buffer.byteLength));
            await this.setReport(REPORT_ID_DONGLE, this.pktSetLedEffect.command());
        }
    }

    async getKeyMatrix(layer: KeyMatrixLayer, table: MatrixTable, board: number): Promise<void> {
        this.pktGetKeyMatrix.board = board;
        this.pktGetKeyMatrix.layer = layer;
        this.pktGetKeyMatrix.table = table;
        await this.setReport(REPORT_ID_DONGLE, this.pktGetKeyMatrix.command());
    }

    async setKeyMatrix(layer: KeyMatrixLayer, table: MatrixTable, board: number): Promise<void> {
        if (this.data.keyMatrixs != undefined) {
            this.pktSetKeyMatrix.board = board;
            this.pktSetKeyMatrix.layer = layer;
            this.pktSetKeyMatrix.table = table;
            this.pktSetKeyMatrix.packageIndex = 0;
            this.pktSetKeyMatrix.retry = REPORT_MAX_RETRY;
            this.pktSetKeyMatrix.buffer = new Uint8Array(this.data.keyMatrixs[layer].buffer.buffer.slice(0, this.data.keyMatrixs[layer].buffer.byteLength));
            await this.setReport(REPORT_ID_DONGLE, this.pktSetKeyMatrix.command());
        }
    }

    async getMacros(): Promise<void> {
        this.pktGetMacros.block = 0x00;
        this.pktGetMacros.blockCount = MACRO_MAX_LENGTH / MACRO_PER_BLOCK_LENGTH;
        await this.setReport(REPORT_ID_DONGLE, this.pktGetMacros.command());
    }

    async setMacros(): Promise<void> {
        if (this.data.macros != undefined) {
            this.pktSetMacros.block = 0;
            this.pktSetMacros.packageIndex = 0;
            this.pktSetMacros.retry = REPORT_MAX_RETRY;
            this.pktSetMacros.buffer = this.data.macros.serialize();
            this.pktSetMacros.blockCount = Math.ceil(this.pktSetMacros.buffer.length / MACRO_PER_BLOCK_LENGTH);
            await this.setReport(REPORT_ID_DONGLE, this.pktSetMacros.command());
        }
    }

    async getLedColors(board: number): Promise<void> {
        this.pktGetLedColors.board = board;
        await this.setReport(REPORT_ID_DONGLE, this.pktGetLedColors.command());
    }

    async setLedColors(board: number): Promise<void> {
        if (this.data.ledColors != undefined) {
            this.pktSetLedColors.board = board;
            this.pktSetLedColors.packageIndex = 0;
            this.pktSetLedColors.retry = REPORT_MAX_RETRY;
            this.pktSetLedColors.buffer = new Uint8Array(this.data.ledColors?.buffer.buffer.slice(0, this.data.ledColors?.buffer.byteLength));
            await this.setReport(REPORT_ID_DONGLE, this.pktSetLedColors.command());
        }
    }

    async setFactory(): Promise<void> {
        await this.setReport(REPORT_ID_DONGLE, this.pktSetFactory.command());
    }

    private dongleStatusReport(event: any) {
        let status = event.detail as boolean ? ConnectionStatusEnum.Connected : ConnectionStatusEnum.Disconnected;
        this.state.ConnectionStatus = status;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnDongleStatusChanged, { detail: status }));
        if (status == ConnectionStatusEnum.Connected) {
            this.getPassword();
        }
    }

    private passwordReport(event: any) {
        let password = event.detail.pwd as number;
        let version = event.detail.version as string;
        this.state.fwVersion = version;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnPasswordGotten, { detail: password }));
    }

    private getProfileReport(event: any) {
        this.data.boardProfile = event.detail as BoardProfile;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnProfileGotten, { detail: this.data.boardProfile }));
    }

    private getLedEffectReport(event: any) {
        this.data.ledEffect = event.detail as LedEffect;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnLedEffectGotten, { detail: this.data.ledEffect }));
    }

    private getKeyMatrixReport(event: any) {
        let layer = event.detail.layer as KeyMatrixLayer;
        let data = event.detail.data as KeyMatrix;
        if (this.data.keyMatrixs != undefined) {
            this.data.keyMatrixs[layer] = data as KeyMatrix;
        }
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnKeyMatrixGotten, { detail: this.data.keyMatrixs }));
    }

    private getMacrosReport(event: any) {
        this.data.macros = event.detail as Macros;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnMacrosGotten, { detail: this.data.macros }));
    }

    private getLedColorsReport(event: any) {
        this.data.ledColors = event.detail as LedColors;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnLedColorsGotten, { detail: this.data.ledColors }));
    }

    private setFactoryReport(event: any) {
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnSetFactorySuccess, { detail: true }));
    }


    private async nextReport(event: any) {
        let pkt = event.detail as Packet_Dongle;
        await this.setReport(REPORT_ID_DONGLE, pkt.command());
    }

    private async nextBlock(event: any) {
        let pkt = event.detail as Packet_Dongle_Block_Set;
        pkt.block = pkt.block + 1;
        if (pkt.block < pkt.blockCount) {
            await this.setReport(REPORT_ID_DONGLE, pkt.command());
        }
    }

    async destroy(): Promise<void> {
        super.destroy();
        this.pktGetDongleStatus.destroy();
        this.pktGetProfile.destroy();
    }
}