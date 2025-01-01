import { SchemaBuilder } from "@/components/schema-builder";
import { CodePreview } from "@/components/code-preview";
import { Button } from "@/components/ui/button";
import { ArrowDown, Code2, Wand2, Zap } from "lucide-react";
import Link from "next/link";
import BuilderSection from "@/components/builder-section";

export default function Home() {


  return (
    <main className="bg-background">
      {/* Hero Section */}
      <div className="min-h-screen">
        <section className="relative py-20 px-6 overflow-hidden border-b">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
          <div className="max-w-5xl mx-auto relative">
            <div className="text-center space-y-8">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Zod Schema Generator
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Create type-safe Zod validation schemas with an intuitive visual builder.
                No more manual schema writing - build, validate, and export in seconds.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="#builder" passHref>
                  <Button size="lg">
                    Start Building
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://github.com/Deniz073/zod-schema-generator" target="_blank" passHref>
                  <Button size="lg" variant="outline">
                    Contribute!
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything you need to build robust schemas
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Visual Builder</h3>
                <p className="text-muted-foreground">
                  Intuitive interface to build complex schemas without writing any code.
                  Add fields, validations, and transformations with ease.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Preview</h3>
                <p className="text-muted-foreground">
                  See your schema code update in real-time as you build.
                  Copy the generated code with one click.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Type Safety</h3>
                <p className="text-muted-foreground">
                  Generate fully type-safe Zod schemas that work seamlessly with
                  TypeScript. Catch errors before they happen.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Builder Section */}
      <section id="builder" className="min-h-screen px-6 bg-slate-50/50 ">
        <div className="mx-auto max-w-[100rem] h-full py-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold">Build Your Schema</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Add fields, configure validations, and see your schema code in real-time.
              Copy the generated code when you&apos;re ready to use it in your project.
            </p>
          </div>
          <BuilderSection />
        </div>
      </section>
    </main>
  );
}