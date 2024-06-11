declare module 'mimemessage' {
    export interface MimeMessage {
        factory(options: FactoryOptions): MimeMessage;
        header(name: string, value: string): void;
        body: MimeMessage[];
    }

    export interface FactoryOptions {
        contentType?: string;
        contentTransferEncoding?: string;
        body?: string | MimeMessage[];
    }

    const mimemessage: MimeMessage;
    export default mimemessage;
}
