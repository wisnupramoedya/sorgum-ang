export class NegotiatingRTCPCDto{
    sdp!:string;
    type!:string;
}

export class NegotiatingRTCPCWithIdDto{
    Data!:NegotiatingRTCPCDto;
    Id!:number;
}