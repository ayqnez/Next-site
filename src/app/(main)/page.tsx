import pageStyles from '@/styles/pages/index.module.css'

import Promo from "@/components/Promo";
import BackgroundImage from '@/components/BackgroundImage';

import backImg from '@/images/home-back.png'
import pythonImg from '@/images/python.jpg'
import clsx from 'clsx';

import Image from 'next/image'

export const metadata = {
  title: "AIEmotion | Home page",
  description: "Home page",
}

export default async function Index() {

  return (
    <>
      <BackgroundImage src={backImg.src} bgClassName='bg-black'>
        <Promo
          style={{ maxWidth: '820px' }}
          info="The new way to work online"
          title={
            <>AI-Powered <br />
              <span style={{ fontWeight: '700', whiteSpace: 'nowrap', display: 'inline-flex', gap: '12px' }}>
                Emotion Recognition <svg width="83" height="99" viewBox="0 0 83 99" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M82.329 43.0402C81.9276 41.965 80.899 41.25 79.7495 41.25H46.5433L65.697 4.0095C66.2993 2.838 65.9885 1.40525 64.9518 0.59125C64.4513 0.19525 63.849 0 63.2495 0C62.6088 0 61.968 0.2255 61.4538 0.66825L41.2495 18.117L0.9538 52.9183C0.0848004 53.669 -0.228699 54.8817 0.172801 55.957C0.574301 57.0322 1.60005 57.75 2.74955 57.75H35.9558L16.802 94.9905C16.1998 96.162 16.5105 97.5947 17.5473 98.4088C18.0478 98.8047 18.6501 99 19.2495 99C19.8903 99 20.531 98.7745 21.0453 98.3317L41.2495 80.883L81.5453 46.0817C82.417 45.331 82.7278 44.1183 82.329 43.0402Z" fill="#FFAC33" /></svg>
              </span>
            </>
          }
          description="AI system that analyzes facial expressions and accurately recognizes emotions in images or video."
          buttons={[
            {
              href: '/recognize',
              caption: 'Start recognize',
              className: 'color-white'
            },
          ]}
          childrenClassNames={{
            container: pageStyles.container,
            info: clsx('color-white', pageStyles.info),
            title: clsx('color-white', pageStyles.title),
            description: clsx('color-grey', pageStyles.desc),
            buttons: pageStyles.buttons
          }}
        />
      </BackgroundImage>

      <Promo
        style={{ maxWidth: '650px' }}
        title={
          <>
            AI-Powered Emotion Recognition
          </>
        }
        description='Our intelligent system analyzes facial expressions in real time and accurately identifies human emotions. Built on a custom deep learning model, it processes images instantly and provides clear, reliable predictions — no manual configuration required. Simply upload an image and let the AI do the work.'
        additionalContentNode={
          <>
            <Image src={pythonImg} alt='' />
          </>
        }
        childrenClassNames={{
          container: clsx('bg-light-grey', pageStyles.nodeContainer),
          title: pageStyles.nodeTitle,
          additionalContentNode: pageStyles.additionalContentNode
        }}
      />
    </>
  );
}