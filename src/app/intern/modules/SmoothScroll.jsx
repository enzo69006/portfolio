"use client";

import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "locomotive-scroll/dist/locomotive-scroll.css";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
    useEffect(() => {
        const scrollEl = document.querySelector("[data-scroll-container]");

        const locoScroll = new LocomotiveScroll({
            el: scrollEl,
            smooth: true,
            multiplier: 1.0,
            lerp: 0.1,
        });

        locoScroll.on("scroll", ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(scrollEl, {
            scrollTop(value) {
                return arguments.length
                    ? locoScroll.scrollTo(value, 0, 0)
                    : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0, left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            pinType: scrollEl.style.transform ? "transform" : "fixed",
        });

        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.removeEventListener("refresh", () => {});
            locoScroll.destroy();
        };
    }, []);

    return <div data-scroll-container>{children}</div>;
}
