import { Packet_Dongle_Set } from "@/keyboard/rk_l87/packets/dongle/setPacket";

export class SetLedEffectPacket extends Packet_Dongle_Set {

    constructor(callback: (event: any) => void) {
        super(0x09, callback);
    }
}