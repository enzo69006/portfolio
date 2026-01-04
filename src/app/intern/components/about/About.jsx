"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null);
    const bubble2    = useRef(null);

    useEffect(() => {
        let loco;
        import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
            const scrollerEl = document.querySelector("[data-scroll-container]");
            if (!scrollerEl) {
                console.error("data-scroll-container introuvable");
                return;
            }

            // 1) on initialise Locomotive
            loco = new LocomotiveScroll({
                el: scrollerEl,
                smooth: true,
            });

            // 2) on branche ScrollTrigger sur Locomotive
            ScrollTrigger.scrollerProxy(scrollerEl, {
                scrollTop(value) {
                    return arguments.length
                        ? loco.scrollTo(value, { duration: 0, disableLerp: true })
                        : loco.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight,
                    };
                },
                pinType: scrollerEl.style.transform ? "transform" : "fixed",
            });
            loco.on("scroll", ScrollTrigger.update);

            // 3) timeline GSAP + ScrollTrigger
            gsap.timeline({
                scrollTrigger: {
                    trigger:   sectionRef.current,
                    scroller:  scrollerEl,
                    start:     "top top",
                    end:       "+=100%",   // pinner pendant 1× viewport
                    pin:       true,
                    scrub:     true,

                    // AU DÉBUT : on arrête tout scroll
                    onEnter:    () => loco.stop(),
                    // À LA FIN OU RETOUR EN ARRIÈRE : on relance le scroll
                    onLeave:    () => loco.start(),
                    onLeaveBack:() => loco.start(),
                },
            })
                .fromTo(
                    bubble2.current,
                    { autoAlpha: 0, y: 100 },
                    { autoAlpha: 1, y: 0, ease: "power2.out" }
                );

            // refresh
            ScrollTrigger.addEventListener("refresh", () => loco.update());
            ScrollTrigger.refresh();
        });

        return () => {
            // cleanup
            ScrollTrigger.getAll().forEach(t => t.kill());
            ScrollTrigger.removeEventListener("refresh", () => {});
            if (loco) loco.destroy();
        };
    }, []);

    return (
        <section data-scroll-section ref={sectionRef} className={styles.section}>
            <div className={`${styles.bubble} ${styles.left}`}>
                But what if I have questions about your services ?
            </div>
            <div ref={bubble2} className={`${styles.bubble} ${styles.right}`}>
                Don’t worry, we’ve got you covered :)
            </div>
        </section>
    );
}
