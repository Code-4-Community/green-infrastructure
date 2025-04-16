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
      <p style={headings}>About the Map: <br />
        <div style={content}>
        This interactive map serves to display all of the green infrastructure sites in Boston. The map legend allows users to sort sites by feature type and by the site status. A site status of 'Available' represents a site that is available, 'Adopted' represents a site that has been already adopted, and 'Inactive' represents sites that are not currently available to adopt.
        </div>
      </p>

      <p style={headings}>Purpose of Interactive Map: <br />
        <div style={content}>
          The purpose of this map is for users to interactively find a Green Infrastructure site that they would like to adopt and then take care of. Once the user finds a site that they would like to adopt, they can apply for the site and then wait for approval from an Admin to officially adopt the site and create a volunteer account!
        </div>
      </p>
      <p style={headings}>
        How to use Map: <br />
        <div style={content}>
          <ol type="1" style={{ margin: '0' }}>
            <li>Use the interactive map to pick a site and click on the site icon to display the corresponding pop-up box</li>
            <li>Click on 'Interested in Adopting' and complete the form to apply for the site</li>
            <li>Submit form and wait for approval from an Admin</li>
            <li>Once approved by Admin, an email with a unique user ID is automatically sent that allows volunteer account creation</li>
            <li>Take care of the site and log maintenance tasks!!</li>

          </ol>
        </div>
      </p>
    </div >
  );

};