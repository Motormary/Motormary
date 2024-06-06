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

export default function Portfolio() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-10">My Work</h1>
      <div className="mt-10 space-y-10">
        {/* Card 1 */}
        <Card className="w-full grid justify-center text-center col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">
              Community Science Museum
            </CardTitle>
            <CardDescription className="text-balance">
              The Community Science Museum is an interactive science museum
              aimed at primary and middle school children (ages 7-15) and
              families with young children. Our modern, accessible, and
              responsive web presence is designed to excite and entice visitors
              to explore the museum&apos;s offerings.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Image src={museum} alt="Museum" />
          </CardContent>
          <CardFooter className="grid gap-1.5 text-muted-foreground text-sm">
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
          </CardFooter>
        </Card>
        {/* Card 2 */}
        <Card className="w-full grid justify-center text-center col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Hotview Labs Blog</CardTitle>
            <CardDescription className="text-balance">
              This project involves designing and building a responsive
              front-end interface for an existing blogging API. The application
              will include both public-facing pages for users to view and
              interact with blog posts, and admin pages for authorized users to
              manage content.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Image src={blog} alt="blog" />
          </CardContent>
          <CardFooter className="grid gap-1.5 text-muted-foreground text-sm">
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
          </CardFooter>
        </Card>
        {/* Card 3 */}
        <Card className="w-full grid justify-center text-center col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Game Hub</CardTitle>
            <CardDescription className="text-balance">
              GameHub is an online shop where users can purchase computer games.
              This gaming marketplace lets you buy tons of video games online
              for any device.
              Aimed at ages 18 to 25 who are interested in computer games, and would either like to purchase games or would like to sell games they have finished playing.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Image src={gamehub} alt="gamehub" />
          </CardContent>
          <CardFooter className="grid gap-1.5 text-muted-foreground text-sm">
            <span>Live: Coming soon ™</span>
            <span>
              Repo:{" "}
              <a
                href="https://github.com/NoroffFEU/html-css-course-assignment-Motormary/tree/main"
                target="_blank"
                className="underline text-secondary-foreground visited:text-blue-500">
                Github
              </a>
            </span>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
