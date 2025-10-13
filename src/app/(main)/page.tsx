import pageStyles from '@/styles/pages/index.module.css'

import AnimatedStack from "@/components/AnimatedStack";
import Promo from "@/components/Promo";
import CompanyList from '@/components/CompanyList';

import companyImg from '@/images/companies.png'

export const metadata = {
  title: "Quickly | Home page",
  description: "Home page",
}

export default function Index() {
  return (
    <>
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

      <div className='bs-flex-container l'>
        <CompanyList
          subtitle='Join a community of millions of users globally who are using Quickly to get more done.'
          companySrc={companyImg.src}
          style={{
            margin: '50px 0'
          }}
          childrenClassNames={{
            subtitle: 'color-purple'
          }}
        />
      </div>
    </>
  );
}
