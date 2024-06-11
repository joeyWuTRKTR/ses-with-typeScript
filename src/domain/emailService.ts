import mimemessage from 'mimemessage';

export const ATTACHMENT_CONTENT_TYPE = {
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    CSV: 'text/csv'
};

export const getMailContent = async (from: string, to: string, subject: string, body: string, attachmentContentType: string, buffer: Buffer) => {
    // 使用multipart/mixed作為主體類型，郵件可以包含多部分內容（如文本和附件）
    const mailContent = mimemessage.factory({
        contentType: "multipart/mixed",
        body: [],
    });

    // 設置郵件的發件人、收件人和主題
    mailContent.header("From", from);
    mailContent.header("To", to);
    mailContent.header("Subject", subject);

    // 處理替代內容類型，如純文本和 HTML
    const alternateEntity = mimemessage.factory({
        contentType: "multipart/alternate",
        body: [],
    });

    const htmlEntity = mimemessage.factory({
        contentType: 'text/html;charset=utf-8',
        body:  '   <html>  '  +
            '   <head></head>  '  +
            '   <body>  '  +
            '   <h1>Hello!</h1>  '  +
            '   <p> It\'s first section</p>  '  +
            '   </body>  '  +
            '  </html>  '
    });

    // 使用郵件主題作為內容，默認content-type為text/plain
    const plainEntity = mimemessage.factory({
        body: body,
    });

    alternateEntity.body.push(htmlEntity);
    alternateEntity.body.push(plainEntity);

    mailContent.body.push(alternateEntity);

    // node-ses套件接收base64編碼的附件
    const attachmentEntity = mimemessage.factory({
        contentType: attachmentContentType,
        contentTransferEncoding: "base64",
        body: buffer.toString("base64"),
    });


    attachmentEntity.header(
        "Content-Disposition",
        `attachment ;filename="${subject}.xlsx"`
    );

    mailContent.body.push(attachmentEntity);

    return mailContent;
}



