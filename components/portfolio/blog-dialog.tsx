import Image from "next/image"
import PortfolioDialog from "./portfolio-dialog"
import blog from "/public/hvlblog.png"


export default function BlogDialog() {
    return (
        <PortfolioDialog
        trigger={<Image className="hover:cursor-pointer hover:outline hover:outline-2 outline-primary rounded-lg" src={blog} alt="blog" />}
        title="HotView Labs"
        description="Technology blog"
        >
        <p>text</p>
        </PortfolioDialog>
    )
}