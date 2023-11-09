import { useRef } from "react";

const SCROLL_OFFSET = 20
const NAVBAR_HEIGHT = 109

export default function About() {

  const aboutSection = useRef(null)

  /* Scrolls to the element that executed this function */
  function executeScrollTo(e: any) {
      e.preventDefault();
      const aboutTitle: HTMLElement = e.target as HTMLElement
      const yPos = aboutTitle.getBoundingClientRect().top + window.scrollY - (NAVBAR_HEIGHT + SCROLL_OFFSET)
      window.scrollTo({top: yPos, behavior: 'smooth'} )
  }

  const title = {
    color: 'var(--Text-Primary, #091F2F)',
    fontFamily: 'Montserrat',
    fontSize: '27px',
    fontStyle: 'bold',
    fontWeight: '1000',
    lineHeight: 'normal',
    textDecorationLine: 'underline',
    margin: '0'
  }

  const headings = {
    color: 'var(--Text-Second, #288BE4)',
    fontFamily: 'Lora',
    fontSize: '25px',
    fontStyle: 'italic',
    fontWeight: '400',
    lineHeight: 'normal',
    margin: '0'
  }

  const content = {
    color: 'var(--text-primary-2, #58585B)',
    fontFamily: 'Lora',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal'
  }

  return (
    <div
      style={{
        display: 'flex',
        padding: '20px 40px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '15px',
        flexShrink: '0',
        background: 'white'
      }}
    >
      <p ref={aboutSection} onClick={executeScrollTo} style={title}><u>ABOUT: ADOPT-A-GREEN INFRASTRUCTURE AND FEATURE VIEWER</u></p>
      <p style={headings}>Setting the Scene and Brief History: <br />
        <div style={content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex
        </div>
      </p>

      <p style={headings}>Purpose of Interactive Map: <br />
        <div style={content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
        </div>
      </p>
      <p style={headings}>
        How to use Map: <br />
        <div style={content}>
          <ol type="1" style={{ margin: '0' }}>
            <li>Lorem ipsum dolor sit amet</li>
            <li>consectetur adipiscing elit</li>
            <li>sed do eiusmod tempor incididunt ut labore</li>
            <li>et dolore magna aliqua</li>
          </ol>
        </div>
      </p>

      <p style={headings}>Importance: <br />
        <div style={content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex
        </div>
      </p>

      <p style={headings}>Feature Type and Descriptions: <br />
        <div style={content}>
          Rain Garden: Small shallow depressed planted areas consisting of biosoil and simple plant palettes. <br />
          Bioswale: Medium-sized depressed planted features that are often longer than they are wide
          and may have overflow structures/pipes. <br />
          Bioretention: Larger depressed planted features that vary in size and shape and can capture
          and infiltrate larger volumes of runoff (typically have pipes and structures). <br />
          Porous Paving: Paving materials, like asphalt, concrete or pavers, with voids or gaps that
          water is able to pass through. <br />
          Tree Trench/Planter: Hybrid features that are planted with trees at the surface and have
          subsurface infiltration areas that give trees access to large volumes of stormwater
          while it absorbs into the ground. <br />
          Green Roof/Planter: Vegetated areas, at ground level or on roofs, that consist of planting
          soil or other lightweight planting materials, and native plants.
        </div>
      </p>
    </div >
  );

};