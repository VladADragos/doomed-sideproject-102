import { typeNextPage } from 'next';
interface TLayout {
    style: string;
    blocks: TBlock[];

}



interface TBlock {
    style: string;
    image?: { src: string, style: string };
    text?: { content: string, style: string }[];
}

interface TPage {
    layout?: string;
    name: string;
    pageNumber: number;
}