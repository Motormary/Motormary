export default function WelcomeMsg({ welcome }: { welcome: string }) {
  return <pre className="text-secondary">{welcome}</pre>
}
