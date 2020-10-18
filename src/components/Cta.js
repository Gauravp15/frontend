import React from 'react';
/* import ReactArcText from 'react-arc-text-fix'; */

class Cta extends React.Component {

    render() {
        let {
            ctaText,
            linkOut,
            mode = "light",
            className,
            imgSrc
        } = this.props;

        return (
            <a className={`btnMain ${mode === "dark" ? "darkText" : ''}`} href={linkOut} rel="noopener noreferrer" target="_blank">
                {/* <ReactArcText
                    text={ctaText}
                    direction={-1}
                    arc={90}
                    class={className}
                /> */}
                <img src={imgSrc} alt={ctaText} />
            </a>
        )
    }
}

export default Cta;