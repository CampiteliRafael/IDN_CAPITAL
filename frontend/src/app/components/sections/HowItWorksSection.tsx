"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HowItWorksSection() {

    const steps = [
        {
            id: 1,
            title: "Cadastro",
            description: "Registre-se gratuitamente e configure seu perfil de investidor em poucos minutos."
        },
        {
            id: 2,
            title: "Análise",
            description: "Acesse análises avançadas do seu portfólio e receba insights personalizados."
        },
        {
            id: 3,
            title: "Simule",
            description: "Teste diferentes estratégias de investimento com nosso simulador realista."
        },
        {
            id: 4,
            title: "Resultados",
            description: "Acompanhe o desempenho de seus investimentos e obtenga relatórios detalhados."
        },
    ];

    return (
        <section id="how-it-works" className="relative py-20">
            <Image
                src="/howitworks.png"
                alt="How It Works Background"
                fill
                className="object-cover"
                priority
                quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>

            <div className="container z-20 relative">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-white font-bold text-center mb-5">Como Funciona</h2>
                    <p className="text-white text-lg text-center max-w-2xl mx-auto mb-12">Descubra como nossa plataforma pode transformar sua experiência de investimento em 4 passos simples.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                    {steps.map((step, index) => (
                        <div key={step.id} className="bg-gold-light/80 p-6 rounded-lg shadow-md text-center">
                            <motion.div
                                className="text-center mb-16"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                            >
                                <h3 className="text-moss font-semibold mb-3">{step.title}</h3>
                                <p className="text-moss">{step.description}</p>
                            </motion.div>
                            {index < steps.length && (
                                <motion.div
                                    className="hidden lg:block mx-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                >
                                    <svg
                                        className="w-8 h-8 text-gold-light"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}