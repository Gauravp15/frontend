import React from 'react';
import * as PIXI from 'pixi.js-legacy';
import { RGBSplitFilter } from '@pixi/filter-rgb-split';
import { GlitchFilter } from '@pixi/filter-glitch';
import { gsap } from 'gsap';


class Glitch extends React.Component {
    constructor(props) {
        super(props);

        this.glitchImage = React.createRef();
        this.texture = PIXI.Texture.from(this.props.imagePath);
        this.image = new PIXI.Sprite(this.texture);

    }

    componentDidMount() {
        let canvas = this.glitchImage.current;

        let glitchEff = new PIXI.Application({
            view: canvas,
            width: 630,
            height: 700,
            transparent: true
        });

        PIXI.utils.skipHello();

        glitchEff.stage.addChild(this.image);
        this.image.filters = [new RGBSplitFilter(), new GlitchFilter()];
        // reset rgb split
        this.image.filters[0].red.x = 0;
        this.image.filters[0].red.y = 0;
        this.image.filters[0].green.x = 0;
        this.image.filters[0].green.y = 0;
        this.image.filters[0].blue.x = 0;
        this.image.filters[0].blue.y = 0;

        // reset glitch
        this.image.filters[1].slices = 0;
        this.image.filters[1].offset = 20;

        this.anim();

    }

    randomIntFromInterval = (min, max) => {
        return Math.random() * (max - min + 1) + min
    }

    anim = () => {
        const THAT = this;
        const tl = gsap.timeline({
            delay: this.randomIntFromInterval(0, 3),
            onComplete: this.anim
        });

        tl.to(this.image.filters[0].red, {
            duration: 0.2,
            x: this.randomIntFromInterval(-15, 15),
            y: this.randomIntFromInterval(-15, 15)
        });

        tl.to(this.image.filters[0].red, {
            duration: 0.01,
            x: 0,
            y: 0
        });

        tl.to(this.image.filters[0].blue, {
            duration: 0.2,
            x: this.randomIntFromInterval(-15, 15),
            y: 0,
            onComplete() {

                THAT.image.filters[1].slices = 20
                THAT.image.filters[1].direction = THAT.randomIntFromInterval(-75, 75)

                // console.log(THAT.img.filters[1].slices)

            }
        }, '-=0.2');

        tl.to(this.image.filters[0].blue, {
            duration: 0.1,
            x: this.randomIntFromInterval(-15, 15),
            y: this.randomIntFromInterval(-5, 5),
            onComplete() {

                THAT.image.filters[1].slices = 12
                THAT.image.filters[1].direction = THAT.randomIntFromInterval(-75, 75)

            }
        });

        tl.to(this.image.filters[0].blue, {
            duration: 0.01,
            x: 0,
            y: 0,
            onComplete() {

                THAT.image.filters[1].slices = 0
                THAT.image.filters[1].direction = 0

            }
        });

        tl.to(this.image.filters[0].green, {
            duration: 0.2,
            x: this.randomIntFromInterval(-15, 15),
            y: 0
        }, '-=0.2');

        tl.to(this.image.filters[0].green, {
            duration: 0.1,
            x: this.randomIntFromInterval(-20, 20),
            y: this.randomIntFromInterval(-15, 15)
        });

        tl.to(this.image.filters[0].green, {
            duration: 0.01,
            x: 0,
            y: 0
        });

        tl.timeScale(1.2);
    }

    render() {

        return (
            <canvas className="glitchImage" ref={this.glitchImage} />
        )
    }
}


export default Glitch;