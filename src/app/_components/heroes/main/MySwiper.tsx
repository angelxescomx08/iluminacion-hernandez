"use client";

import Image from "next/image";
import { A11y, Autoplay, Navigation, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import EffectSuperFlow from "./effect-super-flow";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/parallax";
import "./effect-super-flow.css";
import "./MySwiper.css";

export function MainHero() {
	const swiperParameters = {
		modules: [A11y, Autoplay, Navigation, Parallax, EffectSuperFlow],
		loop: true,
		loopAdditionalSlides: 1,
		effect: "super-flow",
		speed: 1000,
		navigation: true,
		autoplay: { enabled: true, reverseDirection: true },
		parallax: { enabled: true },
		lazy: { enabled: true },
		watchSlidesProgress: true,
	};
	return (
		<Swiper {...swiperParameters} className="h-dvh! w-screen!">
			<SwiperSlide className="swiper-slide-4ffe">
				<div className="super-flow-image">
					<Image
						alt="Elegancia que ilumina con calidez"
						className="swiper-slide-bg-image swiper-slide-bg-image-bdb6"
						fill
						priority
						src="/assets/images/heroes/main-hero-2.webp"
					/>

					<div className="swiper-lazy-preloader"></div>
				</div>

				<div className="swiper-slide-content super-flow-content swiper-slide-content-2f5e">
					<div
						className="swiper-slide-text swiper-slide-text-66a3 drop-shadow-md"
						data-swiper-parallax="-100"
					>
						Elegancia que ilumina con calidez
					</div>

					<div
						className="swiper-slide-text swiper-slide-text-48d3 drop-shadow-md"
						data-swiper-parallax="-100"
					>
						Somos una empresa con más de 15 años iluminando hogares
					</div>
				</div>
			</SwiperSlide>

			<SwiperSlide className="swiper-slide-4ffe">
				<div className="super-flow-image">
					<Image
						alt="Diseño, elegancia y luz"
						className="swiper-slide-bg-image swiper-slide-bg-image-bdb6"
						fill
						priority
						src="/assets/images/heroes/main-hero-3.webp"
					/>

					<div className="swiper-lazy-preloader"></div>
				</div>

				<div className="swiper-slide-content super-flow-content swiper-slide-content-2f5e">
					<div
						className="swiper-slide-text swiper-slide-text-66a3 drop-shadow-md"
						data-swiper-parallax="-100"
					>
						Diseño, elegancia y luz
					</div>

					<div
						className="swiper-slide-text swiper-slide-text-48d3 drop-shadow-md"
						data-swiper-parallax="-100"
					>
						Somos una empresa mexicana experta en iluminación decorativa y
						funcional
					</div>
				</div>
			</SwiperSlide>

			<SwiperSlide className="swiper-slide-4ffe">
				<div className="super-flow-image">
					<Image
						alt="Iluminación que transforma espacios"
						className="swiper-slide-bg-image swiper-slide-bg-image-bdb6"
						fill
						priority
						src="/assets/images/heroes/main.webp"
					/>

					<div className="swiper-lazy-preloader"></div>
				</div>

				<div className="swiper-slide-content super-flow-content swiper-slide-content-2f5e">
					<div
						className="swiper-slide-text swiper-slide-text-66a3 drop-shadow-md"
						data-swiper-parallax="-100"
					>
						Iluminación que transforma espacios
					</div>

					<div
						className="swiper-slide-text swiper-slide-text-48d3 drop-shadow-md"
						data-swiper-parallax="-100"
					>
						Soluciones en lámparas y luminarias para cada rincón de tu hogar
					</div>
				</div>
			</SwiperSlide>
		</Swiper>
	);
}
