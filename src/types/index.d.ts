interface Layout {
    style: string;
    blocks: Block[];

}



interface Block {
    style: string;
    image?: { src: string, style: string };
    text?: { content: string, style: string }[];
}

interface Page {
    layout: Layout;
}