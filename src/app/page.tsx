import AnimatedStack from "@/components/AnimatedStack";
import Promo from "@/components/Promo";

export default function Home() {
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
              href: '/start',
              caption: 'Start'
            },
            {
              href: '/learn',
              caption: 'Learn more'
            }
          ]}
          additionalContentNode={
            <AnimatedStack />
          }
          childrenClassNames={{
          }}
        />
      </div>
    </>
  );
}
