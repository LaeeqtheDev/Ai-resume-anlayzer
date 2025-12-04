declare module 'pdfjs-dist/build/pdf.min.mjs' {
    const value: any; // you can narrow this later if needed
    export default value;
}

declare module 'pdfjs-dist/build/pdf.worker.min.mjs?url' {
    const value: string;
    export default value;
}
