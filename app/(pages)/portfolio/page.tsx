import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import image1 from "/public/next.svg"

export default function Portfolio() {
    return (
        <div className="mt-10 grid md:grid-flow-col gap-5">
            <Card className="w-fit ">
                <CardHeader>
                    <CardTitle className="text-primary">
                        title
                    </CardTitle>
                    <CardDescription>
                        desc
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image 
                    src={image1}
                    alt="image"

                    />
                </CardContent>
                <CardFooter className="text-muted-foreground text-sm">
                    date?
                </CardFooter>
            </Card>
            <Card className="w-fit">
                <CardHeader>
                    <CardTitle className="text-primary">
                        title
                    </CardTitle>
                    <CardDescription>
                        desc
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image 
                    src={image1}
                    alt="image"

                    />
                </CardContent>
                <CardFooter className="text-muted-foreground text-sm">
                    date?
                </CardFooter>
            </Card>
            <Card className="w-fit">
                <CardHeader>
                    <CardTitle className="text-primary">
                        title
                    </CardTitle>
                    <CardDescription>
                        desc
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image 
                    src={image1}
                    alt="image"

                    />
                </CardContent>
                <CardFooter className="text-muted-foreground text-sm">
                    date?
                </CardFooter>
            </Card>
            
        </div>
    )
}