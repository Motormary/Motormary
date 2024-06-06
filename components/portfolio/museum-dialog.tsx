import Image from "next/image"
import PortfolioDialog from "./portfolio-dialog"
import museum from "/public/museum.png"


export default function MuseumDialog() {
    return (
        <PortfolioDialog
        trigger={<Image className="hover:cursor-pointer hover:outline hover:outline-2 outline-primary rounded-lg" src={museum} alt="Museum" />}
        title="Community Science Museum"
        description="Museum for children"
        >
        <p>The Community Science Museum is an interactive science museum aimed at primary and middle school children (ages 7-15) and families with young children.</p>
        <p>Our modern, accessible, and responsive web presence is designed to excite and entice visitors to explore the museum&apos;s offerings.</p>
        </PortfolioDialog>
    )
}