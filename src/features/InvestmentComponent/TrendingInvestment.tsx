import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import investImg from "@/assets/home-investment-img.png"
import { useTrendingInvestment } from "@/hooks/useInvestment";
import { LoaderIcon } from "@/components/PageLoader";

const TrendingInvestment = ({ className }: { className?: string }) => {
    const { data = [], isLoading } = useTrendingInvestment();
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToNext = () => {
        if (!isTransitioning && data.length > 0) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => (prev + 1) % data.length);
        }
    };

    const goToSlide = (index: number) => {
        if (!isTransitioning && index !== currentIndex) {
            setIsTransitioning(true);
            setCurrentIndex(index);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsTransitioning(false), 600);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    // Auto-play - only run when data exists
    useEffect(() => {
        if (data.length > 1) {
            const interval = setInterval(goToNext, 4000);
            return () => clearInterval(interval);
        }
    }, [data.length]);

    // Show loading state
    if (isLoading) {
        return (
            <Card className="border-none shadow-none py-0">
                <CardHeader>
                    <CardTitle className={`text-lg font-semibold ${className}`}>TOP 5 Trending Investment</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                    <div className="h-48 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                        <LoaderIcon/>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Show empty state
    if (data.length === 0) {
        return (
            <Card className="border-none shadow-none py-0">
                <CardHeader>
                    <CardTitle className={`text-lg font-semibold ${className}`}>TOP 5 Trending Investment</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                    <div className="h-48 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                        <p className="text-white/60">No trending investments available</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-none shadow-none py-0">
            <CardHeader>
                <CardTitle className={`text-lg font-semibold ${className}`}>TOP 5 Trending Investment</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
                {/* Carousel container */}
                <div className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                    {data.map((slide, index) => (
                        <div
                            key={slide.id || index}
                            className={`absolute inset-0 transition-all duration-600 ${
                                index === currentIndex 
                                    ? "opacity-100 scale-100" 
                                    : "opacity-0 scale-95"
                            }`}
                        >
                            <div className="h-full p-6 flex justify-between gap-6">
                                {/* Text Content */}
                                <div className="flex flex-col justify-between">
                                    <div className="max-w-40 w-full">
                                        <h2 className={`text-white text-xl font-bold mb-2 transition-all duration-700 ${
                                            index === currentIndex
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-4 opacity-0"
                                        }`}>
                                            {slide.title}
                                        </h2>
                                        <p className={`text-white/80 text-sm transition-all duration-700 delay-100 ${
                                            index === currentIndex
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-4 opacity-0"
                                        }`}>
                                            {slide.investors_count} Subscribers
                                        </p>
                                    </div>

                                    {/* Dot indicator */}
                                    <div className="flex gap-2 mt-4 relative z-10">
                                        {data.map((_, dotIndex) => (
                                            <button
                                                key={dotIndex}
                                                onClick={() => goToSlide(dotIndex)}
                                                aria-label={`Go to slide ${dotIndex + 1}`}
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    dotIndex === currentIndex
                                                        ? "bg-megagreen w-6"
                                                        : "bg-white/30 w-2"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Image */}
                                <div className={`flex-shrink-0 transition-all duration-700 delay-200 ${
                                    index === currentIndex
                                        ? "translate-x-0 opacity-100 rotate-0"
                                        : "translate-x-8 opacity-0 rotate-12"
                                }`}>
                                    <img 
                                        src={investImg} 
                                        alt={slide.title || "Investment"} 
                                        width={140}
                                        className="object-contain h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default TrendingInvestment;
