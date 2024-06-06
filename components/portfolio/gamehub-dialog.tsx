import Image from "next/image"
import PortfolioDialog from "./portfolio-dialog"
import gamehub from "/public/gamehub.png"


export default function GameDialog() {
    return (
        <PortfolioDialog
        trigger={<Image className="hover:cursor-pointer hover:outline hover:outline-2 outline-primary rounded-lg" src={gamehub} alt="gamehub" />}
        title="Game Hub"
        description="Video game retailer"
        >
        <p>text</p>
        </PortfolioDialog>
    )
}