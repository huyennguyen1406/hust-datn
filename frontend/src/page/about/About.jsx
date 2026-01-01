import SingleSection from "./component/SingleSection";
import ThreeColumnImageSection from "./component/ThreeColumnSection";
import TwoColumnImageSection from "./component/TwoColumnSection";

const aboutSections = [
  {
    type: "hero",
    title: "Our Sole Story",
    description:
      "From a small workshop to a global brand, our journey is paved with passion for footwear. We believe a good pair of shoes can take you to great places. Discover the dedication, craftsmanship, and innovation that go into every pair of ShoeShop shoes.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMI1iBkP5DaB8SQLiPTgHC20Z-HxqnVKrX584hWyJYJ79AaF0tVux87hVd7JVYT67T6ibukhZLEh-sq2nRHK3XfYoJ_J6eWSxfPl9IyA8fr1O4q893_P1TR9955_1B7ZtGecBiNqHthsdZws8VXcLzB77bsxvQZs9D6MHuqJhk86wPnnGr8vFEfoa6etZeKsxu6Vp2juU2mY7T5I_HCBhChl6rMY73y7sVWcgeyEdPe6VQWxV11w8TpCBN1Z2CnVLpKan76XGe0DEe",
  },
  {
    type: "three-column",
    title: "The Pillars of Our Craft",
    subtitle: "We build our shoes on a foundation of three key principles that guide every design and decision.",
    items: [
      {
        title: "Quality Materials",
        description: "We source only the finest, most durable materials to ensure longevity and comfort.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAMI1iBkP5DaB8SQLiPTgHC20Z-HxqnVKrX584hWyJYJ79AaF0tVux87hVd7JVYT67T6ibukhZLEh-sq2nRHK3XfYoJ_J6eWSxfPl9IyA8fr1O4q893_P1TR9955_1B7ZtGecBiNqHthsdZws8VXcLzB77bsxvQZs9D6MHuqJhk86wPnnGr8vFEfoa6etZeKsxu6Vp2juU2mY7T5I_HCBhChl6rMY73y7sVWcgeyEdPe6VQWxV11w8TpCBN1Z2CnVLpKan76XGe0DEe",
      },
      {
        title: "Expert Craftsmanship",
        description: "Our shoes are made by skilled artisans who pay attention to every single detail.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAz7SsmV5edyfPKxlKyXw-mu_SllDRl6A47Ok6fNxYZEWw_p2Q8dyh2O0R7v-wfuI8VpkbTfixjAQiBZDa7gipKuzdipxUTgM5eWNTyeT05bon5awMXUJCdG0XociuvQcZ8mIDHwcE6MVKTxBvkvwApI5uQztwPg0dR_eey6Rcu6APa0yxdN37SWxdw2QTs0wK4m_RTVxOw9QBQv3hB65WNGYL7JCRBWv4ejn9i7TrNlAGhwNXCEIKSG1ek6pqTPoopY-hJT5k_T730",
      },
      {
        title: "Innovative Design",
        description: "We continuously innovate to bring you modern styles that don't compromise on comfort.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAf96FvnLRFtdvRz-X_HZyQEGNHblilcxUthRrpyYmKL3EnoQLns3x5TZMg-OkEBJDWChoA6366JaI3hFad6103u7V7AKgrg0keZUN2ofLNMXXPprTVhhE5CDjryxtrCFRYZnZ0XZQwWb4B9N-hCGNeQY2UfZTisYjSMLhRDoGboX1PCkR_ub4WsRSPaLxSyXj_YBjSKomRnDQjx5noSjszMtlx-e6_tRlxgygBJ8bsew31sfhfRoOMf-mF6GQZ5413vs7Is5VLmmuv",
      },
    ],
  },
  {
    type: "two-column",
    title: "Humble Beginnings",
    items: [
      {
        title: "The Original Workshop",
        description:
          "Our story began in 1985 with a simple mission: to create shoes that perfectly blend comfort and style.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAMI1iBkP5DaB8SQLiPTgHC20Z-HxqnVKrX584hWyJYJ79AaF0tVux87hVd7JVYT67T6ibukhZLEh-sq2nRHK3XfYoJ_J6eWSxfPl9IyA8fr1O4q893_P1TR9955_1B7ZtGecBiNqHthsdZws8VXcLzB77bsxvQZs9D6MHuqJhk86wPnnGr8vFEfoa6etZeKsxu6Vp2juU2mY7T5I_HCBhChl6rMY73y7sVWcgeyEdPe6VQWxV11w8TpCBN1Z2CnVLpKan76XGe0DEe",
      },
      {
        title: "Built on Values",
        description: "What started as a family-owned business has grown, but our core values remain unchanged.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAf96FvnLRFtdvRz-X_HZyQEGNHblilcxUthRrpyYmKL3EnoQLns3x5TZMg-OkEBJDWChoA6366JaI3hFad6103u7V7AKgrg0keZUN2ofLNMXXPprTVhhE5CDjryxtrCFRYZnZ0XZQwWb4B9N-hCGNeQY2UfZTisYjSMLhRDoGboX1PCkR_ub4WsRSPaLxSyXj_YBjSKomRnDQjx5noSjszMtlx-e6_tRlxgygBJ8bsew31sfhfRoOMf-mF6GQZ5413vs7Is5VLmmuv",
      },
    ],
  },

  {
    type: "three-column",
    title: "A Step Through History",
    subtitle: "From our first stitch to global recognition, a look back at the moments that made us.",
    items: [
      {
        title: "1985: The First Pair",
        description: "Our journey began with 'The Original,' a handcrafted leather boot.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA9OTIAmydTcH7hJj9LxZvxEXvJlT00J0c2-Q0d9Belzl_yy8bL7NE5dAtWt79oLg-5U2u8o8KROkFDt6CvbAX0XM4uaUXEWLLr05hoozIEbJUeaFJxjKaRvbXy4yawimzMscxmUC6vubC0LW9JbDHgVQ5knDx3l8CdrexXj2eRKvmRejwvrweQ4ov59tC2-sUveL9jFs9asw5cjyIR8uo0G64StdhpUj7hac76s1mxPdiB4rDyQLMkUd7r_9mkyvFNDhtZgBlD02kE",
      },
      {
        title: "2005: Going Global",
        description: "We opened our first international store.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCp4-n7DK3GCdT40monPsMqcKLD6ImKqIPMmXKZaQcMtQRAZVGlz2KHnKThHuPFabFG6ObtmV8jXKv-4bJ55KdsJSNMiC22yAZK_T3EVh9iRroD_c4OLR4-LjVw5tPnf_gkaCc3eJj5uz6ENLrurDcYUBJPULGIET4f1ffCNdbrhkpsPklA2L6P6ekszCE0VCKtLoWux4I1dRzNwF0K0ybFN1Enrx556Mv5deIcKLoUEQDjGLKCFqeUijjWt7hi0nTbCFSW_fzeMBnV",
      },
      {
        title: "2023: Sustainable Steps",
        description: "Launched our first fully sustainable collection.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAlZ9yq9ZXV_z0_XDg_tXgIU_JnmeKxke51lrBl4gt69tHUejjOCbFo9D2gyQsiFTVxhEurtkDL4fiSCEARBbL9GffRU7-wuqgsgyjtbdNF4sa6saCCvOxinHj_l4Npf2F67OOAKm5uU09wT_NYEYvzYsR1OhUxgYPVbEebl1d-UBwA8Z0oh4UvlOtq-XI1qoFm9HvfJEarNDZTApDTnyKZN4j0ZtYcPdIwciGsltVniyRyNFCcCmVAN-uyQklRAjHColEzFv3cbpFe",
      },
    ],
  },
];

const About = () => {
  return (
    <>
      {aboutSections.map((section, index) => {
        const bgClass = index % 2 === 0 ? "bg-[#eef3fb]" : "bg-[#f6f1ea]";

        switch (section.type) {
          case "hero":
            return (
              <SingleSection
                key={index}
                title={section.title}
                description={section.description}
                image={section.image}
                bg={bgClass}
              />
            );

          case "two-column":
            return <TwoColumnImageSection key={index} title={section.title} bg={bgClass} items={section.items} />;

          case "three-column":
            return (
              <ThreeColumnImageSection
                key={index}
                title={section.title}
                subtitle={section.subtitle}
                bg={bgClass}
                items={section.items}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default About;
