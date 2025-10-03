import pageStyles from '@/styles/pages/index.module.css'

import AnimatedStack from "@/components/AnimatedStack";
import Promo from "@/components/Promo";
import {SubscribeBanner} from "@/components/SubscribeBanner";
import subscribeIcon from "@/images/subscribeIcon.png"

export const metadata = {
    title: "Quickly | Home page",
    description: "Home page",
}

export default function Index() {
  return (
    <>
      <div>
        <Promo
          style={{ maxWidth: '600px' }}
          info="The new way to work online"
          title="Get the important work done faster"
          description="With Quickly, you can get more productive work done in far less time than ever before."
          buttons={[
            {
              href: '/tasks',
              caption: 'Start',
              className: 'bg-purple color-white'
            },
            {
              href: '/about',
              caption: 'Learn more'
            }
          ]}
          additionalContentNode={
            <AnimatedStack />
          }
          childrenClassNames={{
            container: 'bg-light-grey',
            title: 'color-purple',
            additionalContentNode: pageStyles.promoAdd
          }}
        />


        <SubscribeBanner
            title='Subscribe For the lastest updates'
            subtitle='Subscribe to newsletter and never miss the new post every week.'
            button={{
                href: '/',
                caption: 'Subscribe',
                className: 'bg-purple color-white'
            }}
            icon={subscribeIcon.src}
            childrenClassNames={{
                container: 'bg-light-grey'
            }}
        />
      </div>
    </>
  );
}
