import React from 'react';
import lottie from 'lottie-web';
import { gsap, TweenLite, Power1, Power2, TimelineLite } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { get } from 'lodash-es';
import customFetch from '../utils/customFetch';
/* import { Waypoint } from 'react-waypoint'; */
/* Component imports */
import '../index.css';
import Header from './Header';
import CaseStudy from './CaseStudy';
import Articles from './Articles';
import Interactions from './Interactions';
import Testimonial from './Testimonial';
import Cta from './Cta';
import Icon from './Icon';
/* Method imports */
/* import { getTestimonials } from '../utils/apiCalls'; */
/* Doodle imports */
import bulb from '../static/bulb.svg';
import pen from '../static/pen.svg';
import colordrop from '../static/colordropper.svg';
import selection from '../static/selectionL.svg';
import chat from '../static/chat.svg';
import equation from '../static/equation.json';
import questionMark from '../static/questionMark.svg';
import triangle from '../static/triangle.svg';
import algeq from '../static/algeq.svg';
import cone from '../static/cone.svg';
import algeq2 from '../static/algeq2.svg';
import barbell from '../static/barbell.svg';
import rope from '../static/rope.svg';
import stroke2 from '../static/stroke2.svg';
import stroke3 from '../static/stroke3.svg';
import halo from '../static/halo.svg';
import pizza from '../static/pizza.svg';
import checkbox from '../static/checkbox.svg';
import hand from '../static/hand.svg';
import hearts from '../static/hearts.svg';
import puzzles from '../static/puzzles.svg';
/* Companies svg imports */
import curefit from '../static/curefit.svg';
import medianet from '../static/medianet.svg';
import toppr from '../static/toppr.svg';
import jabong from '../static/jabong.svg';
/* Social media svg imports */
import behance from '../static/behance.svg';
import medium from '../static/medium.svg';
import dribbble from '../static/dribbble.svg';
import linkedin from '../static/linkedin.svg';
import instagram from '../static/instagram.svg';
import scribble from '../static/scribble.svg';
/* Image imports */
import interactionImg from '../static/interaction.jpg';
import intro from '../static/atulk/intro.png';
import getintouch from '../static/atulk/getintouch.png';
import maths from '../static/atulk/maths.png';
import productivity from '../static/atulk/productivity1.png';
import liftmoods from '../static/atulk/liftmoods.png';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testimonials: [],
            articles: [],
            caseStudies: [],
            isLoaderVisible: true
        }
        this.baseUrl = "http://localhost:8000/wp-json/wp/v2/";
        this.anim = '';
        this.revealRefs = React.createRef([]);
        this.revealRefs.current = [];
        this.sectionRight = React.createRef([]);
        this.sectionRight.current = [];
        this.sectionRefs = React.createRef([]);
        this.sectionRefs.current = [];
        this.leftElementRefs = React.createRef([]);
        this.leftElementRefs.current = [];
        this.rightElementRefs = React.createRef([]);
        this.rightElementRefs.current = [];
        this.dataScroll = React.createRef([]);
        this.dataScroll.current = [];
        this.highlightScroll = React.createRef([]);
        this.highlightScroll.current = [];
        this.timeline = gsap.timeline().pause();
    }

    componentDidMount() {
        this.getCaseStudies();
        this.getArticles();
        this.getTestimonials();
        gsap.registerPlugin(ScrollTrigger, TweenLite, TimelineLite);

        let sections = gsap.utils.toArray(this.sectionRefs.current);
        let descriptions = gsap.utils.toArray(this.revealRefs.current);
        let sectionRight = gsap.utils.toArray(this.sectionRight.current);
        let dataScroll = gsap.utils.toArray(this.dataScroll.current);
        let highlightScroll = gsap.utils.toArray(this.highlightScroll.current);

        gsap.set(sectionRight, { opacity: 0 });
        gsap.set(descriptions, { opacity: 0, y: 50 });
        gsap.set(dataScroll, { opacity: 0, y: 50 });
        gsap.set(highlightScroll, { xPercent: -100 });

        this.timeline.to(sectionRight[0], {
            autoAlpha: 1,
            duration: 0.5
        }).to([descriptions[0], descriptions[1]], {
            autoAlpha: 1,
            duration: 0.5,
            y: 0
        }, 1).to(dataScroll[0], {
            autoAlpha: 1,
            duration: 0.5,
            y: 0
        }, 2).to(highlightScroll[0], {
            xPercent: -100,
            duration: 15,
            ease: "none",
            modifiers: {
                xPercent: gsap.utils.unitize(x => parseFloat(x) % 100)
            },
            repeat: -1
        })

        sections.forEach((section, index) => {
            /* const tl = gsap.timeline({ paused: true });
            tl.to(sectionRight, {
                autoAlpha: 1,
                duration: 0.5
            }).to(descriptions, {
                autoAlpha: 1,
                duration: 0.5,
                y: 0
            }, 1).to(dataScroll, {
                autoAlpha: 1,
                duration: 0.5,
                y: 0
            }, 2).to(highlightScroll, {
                xPercent: -100,
                duration: 15,
                ease: "none",
                modifiers: {
                    xPercent: gsap.utils.unitize(x => parseFloat(x) % 100)
                },
                repeat: -1
            }); */

            /* ScrollTrigger.create({
                trigger: section,
                animation: tl,
                start: "top +=70",
                end: "bottom top",
                scrub: 0.5,
                once: true,
                onEnter: () => this.goToSection(section, tl),
                markers: true
            });
            ScrollTrigger.create({
                trigger: section,
                start: "bottom bottom",
                scrub: 0.5,
                once: true,
                onEnterBack: () => this.goToSection(section),
            }); */
            sectionRight.forEach((sectionRight, index) => {
                this.timeline.to(sectionRight, {
                    autoAlpha: 1,
                    duration: 0.5
                });
            });
            descriptions.forEach((description, index) => {
                this.timeline.to(description, {
                    autoAlpha: 1,
                    duration: 0.5,
                    y: 0
                }, 1);
            });
            dataScroll.forEach((dataScroll, index) => {
                this.timeline.to(dataScroll, {
                    autoAlpha: 1,
                    duration: 0.5,
                    y: 0
                }, 2);
            });
            highlightScroll.forEach((hlScroll, index) => {
                this.timeline.to(hlScroll, {
                    xPercent: -100,
                    duration: 15,
                    ease: "none",
                    modifiers: {
                        xPercent: gsap.utils.unitize(x => parseFloat(x) % 100)
                    },
                    repeat: -1
                });
            });
        });




        /* let proxy = { skew: 0 },
            skewSetter = gsap.quickSetter(sections, "skewY", "deg"), //fast
            clamp = gsap.utils.clamp(-5, 5); //don't let the skew go beyond 20 degrees 

        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -500);
                // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, { skew: 0, duration: 0.8, ease: Power1.easeIn, overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
                }
            }
        }); */

        sectionRight.forEach((el, index) => {
            el.addEventListener('mousemove', evt => {
                let xPos = (evt.clientX / window.innerWidth) - 0.5,
                    yPos = (evt.clientY / window.innerHeight) - 0.5,
                    box = el;

                TweenLite.to(box, 0.6, {
                    rotationY: 20 * xPos,
                    rotationX: 20 * yPos,
                    ease: Power1.easeOut,
                    transformPerspective: 900,
                    transformOrigin: 'center'
                });
                this.leftElementRefs.current.forEach((el, index) => {
                    TweenLite.to(el, 0.6, {
                        rotationY: 40 * xPos,
                        rotationX: 40 * yPos,
                        translateX: 60 * yPos,
                        translateY: 60 * xPos,
                        transformPerspective: 1000,
                        transformOrigin: 'center'
                    });
                });
                this.rightElementRefs.current.forEach((el, index) => {
                    TweenLite.to(el, 0.6, {
                        rotationY: 40 * xPos,
                        rotationX: 40 * yPos,
                        translateX: 60 * yPos,
                        translateY: 60 * xPos,
                        transformPerspective: 1000,
                        transformOrigin: 'center'
                    });
                })
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isLoaderVisible !== prevProps.isLoaderVisible) {
            //play tween
            console.log('Tl', this.tl);
            this.timeline.play();
        }
    }

    addToRevealRefs = el => {
        if (el && !this.revealRefs.current.includes(el)) {
            this.revealRefs.current.push(el);
        }
    }

    addToSectionRightRefs = el => {
        if (el && !this.sectionRight.current.includes(el)) {
            this.sectionRight.current.push(el);
        }
    }

    addToLeftElementRefs = el => {
        if (el && !this.leftElementRefs.current.includes(el)) {
            this.leftElementRefs.current.push(el);
        }
    }

    addToRightElementRefs = el => {
        if (el && !this.rightElementRefs.current.includes(el)) {
            this.rightElementRefs.current.push(el);
        }
    }

    addToSectionRefs = el => {
        if (el && !this.sectionRefs.current.includes(el)) {
            this.sectionRefs.current.push(el);
        }
    }

    addToDataScrollRefs = el => {
        if (el && !this.dataScroll.current.includes(el)) {
            this.dataScroll.current.push(el);
        }
    }

    addToHighlightScrollRefs = el => {
        if (el && !this.highlightScroll.current.includes(el)) {
            this.highlightScroll.current.push(el);
        }
    }

    goToSection = (i, anim) => {
        gsap.to(window, {
            scrollTo: { y: i, autoKill: false },
            duration: 1.4,
            overwrite: true
        });
        if (anim) {
            anim.restart();
        }
    }

    getTestimonials = () => {
        let testimonialApiCall = customFetch(
            this.baseUrl + 'testimonials?_embed',
            "GET"
        );

        let testimonials = [];
        testimonialApiCall.then(res => {
            if (get(res, "status", 200) === 200) {
                get(res, "data", []).map((i, k) => {
                    let testimonialData = {};
                    testimonialData["description"] = get(i, "content.rendered", "");
                    testimonialData["title"] = get(i, "title.rendered", "");
                    testimonialData["authorCompany"] = get(i, "acf.company_name", "");
                    testimonialData["authorName"] = get(i, "acf.testimonial_author", "");
                    testimonialData["authorPosition"] = get(i, "acf.author_position", "");
                    testimonialData["link"] = get(i, "acf.profile_link", "");
                    testimonialData["authorImg"] = get(i, "_embedded.wp:featuredmedia.0.source_url", "");
                    testimonials.push(testimonialData);
                    testimonials.reverse();
                });
                this.setState({
                    testimonials
                })
            }
        }).catch(e => {
            console.log('Testimonials', e);
        });
    }

    getCaseStudies = () => {
        let csApiCall = customFetch(
            this.baseUrl + 'case_studies?_embed',
            "GET"
        );

        let caseStudies = [];
        csApiCall.then(res => {
            if (get(res, "status", 200) === 200) {
                get(res, "data", []).map((i, k) => {
                    let csData = {};
                    csData["description"] = get(i, "content.rendered", "");
                    csData["title"] = get(i, "title.rendered", "");
                    csData["linkOut"] = get(i, "acf.case_study_linkout", "");
                    csData["bgImg"] = get(i, "_embedded.wp:featuredmedia.0.source_url", "");
                    caseStudies.push(csData);
                    caseStudies.reverse();
                });
                this.setState({
                    caseStudies
                })
            }
        }).catch(e => {
            console.log('Case Studies', e);
        });
    }

    getArticles = () => {
        let articlesApiCall = customFetch(
            this.baseUrl + 'articles?_embed',
            "GET"
        );

        let articles = [];
        articlesApiCall.then(res => {
            if (get(res, "status", 200) === 200) {
                get(res, "data", []).map((i, k) => {
                    let articlesData = {};
                    articlesData["description"] = get(i, "content.rendered", "");
                    articlesData["title"] = get(i, "title.rendered", "");
                    articlesData["linkOut"] = get(i, "acf.case_study_linkout", "");
                    articlesData["bgImg"] = get(i, "_embedded.wp:featuredmedia.0.source_url", "");
                    articles.push(articlesData);
                    articles.reverse();
                });
                this.setState({
                    articles
                })
            }
        }).catch(e => {
            console.log('Artices', e);
        });
    }


    render() {
        return (
            <div className="main">
                {/* Header */}
                <Header />
                {/* Intro section */}
                <section className="section introSection" id="section0" ref={this.addToSectionRefs}>
                    <div className="containerRight fullHeight">
                        <div className="sectionWrapper fullHeight">
                            <div className="sectionLeft">
                                <span className="introTitle" ref={this.addToRevealRefs}>Hello, I am Atul Khola</span>
                                <p className="introDescription" ref={this.addToRevealRefs}>a product designer with passion for human centered design that empowers people &amp; communities.</p>
                            </div>
                            <div className="sectionRight" ref={this.addToSectionRightRefs}>
                                <span className="bulb" ref={this.addToLeftElementRefs}><img src={bulb} alt="bulb" /></span>
                                <span className="pen" ref={this.addToLeftElementRefs}><img src={pen} alt="pen" /></span>
                                <span className="colordrop" ref={this.addToRightElementRefs}><img src={colordrop} alt="colordrop" /></span>
                                <span className="selection" ref={this.addToRightElementRefs}><img src={selection} alt="selection" /></span>
                                <span className="chat" ref={this.addToLeftElementRefs}><img src={chat} alt="chat" /></span>
                                <div className="atulImg">
                                    <img src={intro} alt="Atul Khola" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="highlights" ref={this.addToDataScrollRefs}>
                        <div className="containerRight">
                            <span className="highlightTitle">my skill set</span>
                            <ul className="highlightList highlightScroll" ref={this.addToHighlightScrollRefs}>
                                <li className="highlightItem">User experience design</li>
                                <li className="highlightItem">User Interface design</li>
                                <li className="highlightItem">Interaction design</li>
                                <li className="highlightItem">Wireframing, Information architecture &amp; rapid prototyping</li>
                                <li className="highlightItem">Planning &amp; Facilitating User Research</li>
                            </ul>
                        </div>
                    </div>
                </section>
                {/* Second section */}
                <section className="section introSection" id="section1" ref={this.addToSectionRefs}>
                    <div className="containerRight fullHeight">
                        <div className="sectionWrapper fullHeight">
                            <div className="sectionLeft">
                                <p className="introDescription" ref={this.addToRevealRefs}>I am not great at maths but one equation I never get wrong</p>
                                <div className="equation" />
                            </div>
                            <div className="sectionRight" ref={this.addToSectionRightRefs}>
                                <span className="questionMark" ref={this.addToLeftElementRefs}><img src={questionMark} alt="questionMark" /></span>
                                <span className="questionMark1" ref={this.addToLeftElementRefs}><img src={questionMark} alt="questionMark" /></span>
                                <span className="questionMark2"><img src={questionMark} alt="questionMark" /></span>
                                <span className="triangle" ref={this.addToRightElementRefs}><img src={triangle} alt="triangle" /></span>
                                <span className="algeq" ref={this.addToLeftElementRefs}><img src={algeq} alt="algeq" /></span>
                                <span className="cone" ref={this.addToLeftElementRefs}><img src={cone} alt="cone" /></span>
                                <span className="algeq2" ref={this.addToRightElementRefs}><img src={algeq2} alt="algeq2" /></span>
                                <div className="atulImg">
                                    <img src={maths} alt="Atul Khola - Not good at maths" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="highlights" ref={this.addToDataScrollRefs}>
                        <div className="containerRight">
                            <span className="highlightTitle">my tool box</span>
                            <ul className="highlightList highlightScroll" ref={this.addToHighlightScrollRefs}>
                                <li className="highlightItem">Sketch</li>
                                <li className="highlightItem">After Effects</li>
                                <li className="highlightItem">Principle</li>
                                <li className="highlightItem">Lottie</li>
                                <li className="highlightItem">Invision</li>
                                <li className="highlightItem">Abstract</li>
                                <li className="highlightItem">Lookback</li>
                                <li className="highlightItem">Lucidchart</li>
                                <li className="highlightItem">Keynote</li>
                                <li className="highlightItem">Photoshop</li>
                                <li className="highlightItem">Illustrator</li>
                                <li className="highlightItem">Indesign</li>
                            </ul>
                        </div>
                    </div>
                </section>
                {/* Third section */}
                <section className="section introSection" id="section2" ref={this.addToSectionRefs}>
                    <div className="containerRight fullHeight">
                        <div className="sectionWrapper fullHeight">
                            <div className="sectionLeft">
                                <span className="introTitle" ref={this.addToRevealRefs}>I take my fitness seriously, </span>
                                <p className="introDescription" ref={this.addToRevealRefs}>to take my productivity and job performance even more seriously.</p>
                            </div>
                            <div className="sectionRight" ref={this.addToSectionRightRefs}>
                                <span className="barbell" ref={this.addToLeftElementRefs}><img src={barbell} alt="barbell" /></span>
                                <span className="rope" ref={this.addToRightElementRefs}><img src={rope} alt="rope" /></span>
                                <span className="stroke2" ref={this.addToLeftElementRefs}><img src={stroke3} alt="stroke2" /></span>
                                <span className="stroke3" ref={this.addToLeftElementRefs}><img src={stroke2} alt="stroke3" /></span>
                                <div className="atulImg">
                                    <img src={productivity} alt="Atul Khola - Productivity" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="highlights">
                        <div className="containerRight">
                            <span className="highlightTitle">work places</span>
                            <ul className="highlightList">
                                <li className="highlightItem companyItem"><a href="https://www.cure.fit/" target="_blank" rel="noopener noreferrer"><img src={curefit} alt="Cure Fit" /></a></li>
                                <li className="highlightItem companyItem"><a href="https://www.media.net/" target="_blank" rel="noopener noreferrer"><img src={medianet} alt="Media.net" /></a></li>
                                <li className="highlightItem companyItem"><a href="https://www.toppr.com/" target="_blank" rel="noopener noreferrer"><img src={toppr} alt="Toppr" /></a></li>
                                <li className="highlightItem companyItem"><a href="https://www.myntra.com/" target="_blank" rel="noopener noreferrer"><img src={jabong} alt="Jabong" /></a></li>
                            </ul>
                        </div>
                    </div>
                </section>
                {/* Fourth section */}
                <section className="section introSection" id="section3" ref={this.addToSectionRefs}>
                    <div className="containerRight fullHeight">
                        <div className="sectionWrapper fullHeight">
                            <div className="sectionLeft">
                                <span className="introTitle" ref={this.addToRevealRefs}>Apart from lifting weights, I also lift moods with</span>
                                <p className="introDescription" ref={this.addToRevealRefs}>Surprise PIZZAS for the team. Le Pizza fairy</p>
                            </div>
                            <div className="sectionRight liftMoodsRight" ref={this.addToSectionRightRefs}>
                                <span className="halo"><img src={halo} alt="halo" /></span>
                                <span className="pizza1"><img src={pizza} alt="pizza" /></span>
                                <span className="pizza2"><img src={pizza} alt="pizza" /></span>
                                <span className="pizza3"><img src={pizza} alt="pizza" /></span>
                                <span className="pizza4"><img src={pizza} alt="pizza" /></span>
                                <div className="atulImg">
                                    <img src={liftmoods} alt="Atul Khola - Surprise Pizzas" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Case studies */}
                <section className="section introSection lightSection" id="section4" ref={this.addToSectionRefs}>
                    <div className="containerRight fullHeight">
                        <div className="titleWrapper">
                            <h2 className="sectionTitle darkText">Case Studies</h2>
                            <div className="ctaWrapper">
                                <Cta
                                    ctaText={"SEE THEM ON BEHANCE"}
                                    linkOut={"https://www.behance.net/atulkhola"}
                                    mode="dark"
                                    className="ctaText"
                                />
                                <span className="ctaArrow darkText"><Icon icon={"arrow-right2"} size={20} /></span>
                            </div>
                        </div>
                        <div className="dataWrapper dataHighlightScroll">
                            {this.state.caseStudies.map((i, k) => {
                                return (
                                    <CaseStudy
                                        key={`cs-${k}`}
                                        title={i.title}
                                        description={i.description}
                                        linkOut={i.linkOut}
                                        bgImg={i.bgImg}
                                        mode="dark"
                                    />
                                )
                            })}
                        </div>
                    </div>
                </section>
                {/* Articles */}
                <section className="section introSection" id="section4" ref={this.addToSectionRefs}>
                    <div className="containerRight fullHeight">
                        <div className="titleWrapper">
                            <h2 className="sectionTitle">Articles</h2>
                            <div className="ctaWrapper">
                                <Cta
                                    ctaText={"SEE THEM ON MEDIUM"}
                                    linkOut={"https://www.medium.com/@atulkhola"}
                                    mode="light"
                                    className="ctaText"
                                />
                            </div>
                        </div>
                        <div className="dataWrapper dataHighlightScroll">
                            {this.state.articles.map((i, k) => {
                                return (
                                    <Articles
                                        key={`articles-${k}`}
                                        title={i.title}
                                        description={i.description}
                                        linkOut={i.linkOut}
                                        bgImg={i.bgImg}
                                        mode="dark"
                                    />
                                )
                            })}
                        </div>
                    </div>
                </section>
                {/* Interactions */}
                <section className="section introSection lightSection" id="section5" ref={this.addToSectionRefs}>
                    <div className="containerRight fullHeight">
                        <div className="titleWrapper">
                            <h2 className="sectionTitle darkText">Interactions</h2>
                            <div className="ctaWrapper">
                                <Cta
                                    ctaText={"SEE ON DRIBBBLE"}
                                    linkOut={"https://www.instagram.com/pixelandpump"}
                                    mode="dark"
                                    className="ctaText"
                                />
                                <span className="ctaArrow darkText"><Icon icon={"arrow-right2"} size={20} /></span>
                            </div>
                        </div>
                        <div className="dataWrapper highlightScroll">
                            <div className="topIntList">
                                <Interactions
                                    intImg={interactionImg}
                                    intTitle="Test"
                                />
                            </div>
                            <div className="bottomIntList">
                                <Interactions
                                    intImg={interactionImg}
                                    intTitle="Test"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* Testimonials */}
                <section className="section introSection lightSection" id="section5" ref={this.addToSectionRefs}>
                    <div className="containerRight fullHeight">
                        <div className="titleWrapper blockWrapper">
                            <span className="introTitle darkText">The best part about the job</span>
                            <h2 className="sectionTitle darkText">people ❤️</h2>
                        </div>
                        <div className="dataWrapper dataHighlightScroll">
                            {this.state.testimonials.map((i, k) => {
                                return (
                                    <Testimonial
                                        key={`testimonial-` + k}
                                        title={i.title}
                                        description={i.description}
                                        authorName={i.authorName}
                                        authorPosition={i.authorPosition}
                                        authorCompany={i.authorCompany}
                                        linkOut={i.link}
                                        authorImg={i.authorImg}
                                        mode="dark"
                                    />
                                )
                            })}
                        </div>
                    </div>
                </section>
                {/* Contact */}
                <section className="section introSection" id="section6" ref={this.addToSectionRefs}>
                    <div className="containerRight fullHeight">
                        <div className="sectionWrapper fullHeight">
                            <div className="sectionLeft fullHeight">
                                <div className="titleWrapper blockWrapper">
                                    <span className="introTitle">Your company, a runway of brainstormed ideas, a hell of a <span className="textScribble">coffee<span className="scribble"><img src={scribble} alt="scribble" /></span></span> beer and gateway to spectacular.</span>
                                    <h2 className="sectionTitle bottomSectionTitle">Lets connect!</h2>
                                </div>
                                <div className="ctaWrapper">
                                    <Cta
                                        ctaText={"SEND ME A HELLO"}
                                        linkOut={"mailto:atul@designdrug.co"}
                                        className="ctaText"
                                    />
                                    <span className="ctaArrow"><Icon icon={"arrow-right2"} size={20} /></span>
                                </div>
                                <div className="contactBottom">
                                    <ul className="socialList">
                                        <li><a href="https://www.behance.net/atulkhola" target="_blank"><img src={behance} alt="Behance" /></a></li>
                                        <li><a href="https://medium.com/@atulkhola" target="_blank" rel="noopener noreferrer"><img src={medium} alt="Medium" /></a></li>
                                        <li><a href="https://dribbble.com/atulkhola" target="_blank" rel="noopener noreferrer"><img src={dribbble} alt="Dribbble" /></a></li>
                                        <li><a href="https://www.linkedin.com/in/atulkhola/" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn" /></a></li>
                                        <li><a href="https://www.instagram.com/pixelandpump" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a></li>
                                    </ul>
                                    <span className="madeWithLove">made with ❤️</span>
                                </div>
                            </div>
                            <div className="sectionRight" ref={this.addToSectionRightRefs}>
                                <span className="checkbox"><img src={checkbox} alt="checkbox" /></span>
                                <span className="hand"><img src={hand} alt="hand" /></span>
                                <span className="hearts"><img src={hearts} alt="hearts" /></span>
                                <span className="puzzles"><img src={puzzles} alt="puzzles" /></span>
                                <div className="atulImg">
                                    <img src={getintouch} alt="Atul Khola - Get in touch" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Main;