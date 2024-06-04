import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import museum from "/public/museum.png"
import blog from "/public/hvlblog.png"
import gamehub from "/public/gamehub.png"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Portfolio() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-10">Portfolio</h1>
      <div className="mt-10 grid md:grid-flow-col md:grid-cols-3 gap-5">
        <Card className="w-fit grid items-end col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">
              Community Science Museum
            </CardTitle>
            <CardDescription className="flex gap-5">
              <span>
                Live:{" "}
                <a
                  href="https://motormary.github.io/"
                  target="_blank"
                  className="underline text-secondary-foreground visited:text-blue-500">
                  CSM
                </a>
              </span>
              <span>
                Repo:{" "}
                <a
                  href="https://github.com/Motormary/Motormary.github.io"
                  className="underline text-secondary-foreground visited:text-blue-500">
                  Github
                </a>
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <Image className="" src={museum} alt="Museum" />
            <p className="text-sm text-muted-foreground">December 2023</p>
          </CardContent>
          <CardFooter className="text-muted-foreground text-sm">
          </CardFooter>
        </Card>
        <Card className="w-fit grid items-end col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Hotview Labs Blog</CardTitle>
            <CardDescription className="flex gap-5">
              <span>
                Live:{" "}
                <a
                  href="//fed1-pe1-motormary.vercel.app/"
                  target="_blank"
                  className="underline text-secondary-foreground visited:text-blue-500">
                  HvL
                </a>
              </span>
              <span>
                Repo:{" "}
                <a
                  href="https://github.com/Motormary/FED1-PE1-Motormary"
                  target="_blank"
                  className="underline text-secondary-foreground visited:text-blue-500">
                  Github
                </a>
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <Image className="" src={blog} alt="Blog" />
            <p className="text-sm text-muted-foreground">May 2024</p>
          </CardContent>
          <CardFooter className="text-muted-foreground text-sm"></CardFooter>
        </Card>
        <Card className="w-fit grid items-end col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Gamehub</CardTitle>
            <CardDescription className="flex gap-5">
              <span>Live: Coming soon ™</span>
              <span>Repo: -</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <Image className="" src={gamehub} alt="gamehub" />
            <p className="text-sm text-muted-foreground">October 2023</p>
          </CardContent>
          <CardFooter className="text-muted-foreground text-sm"></CardFooter>
        </Card>
      </div>
    </>
  )
}
