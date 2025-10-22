import MainPage from "./MainPage";

// ✅ SEO Metadata for /sscsheet/gk
// export async function generateMetadata() {
//   const apidatasheeturl = process.env.NEXT_PUBLIC_DATASHEET_URLGK;

//   let chapters = [];

//   try {
//     const res = await fetch(`${apidatasheeturl}/chapters`, {
//       next: { revalidate: 36000 }, // cache for 1 hour
//     });
//     if (res.ok) {
//       chapters = await res.json();
//     }
//   } catch (err) {
//     console.error("Error fetching chapters:", err);
//   }

//   const chapterTitles = chapters.map((ch) => ch.title).join(", ");

//   const title = "SSC GK Chapter List – CodeMonarch Academy";
//   const description = `Access all SSC GK chapters including ${chapterTitles || "Dance, Arts, Personality, Arts Awards, Musical Instruments, Festivals, Fairs,  Songs, Painting, Dress, Tribes, First in India, and world Sports, Books and Authors, Famous Personality, Important Days, State GK, Organisation, World GK,  Computer,  Full Form, Religious, Places, Awards, Important Events, Founder, Entertainment, Schemes, Miscellaneous, Ancient History, Medieval History, Modern History, Politics, Geography, Economics, Physics, Chemistry, Biology"}. Expand each topic to explore questions, notes, and video solutions. Prepare effectively with CodeMonarch Academy.`;

//   const image = "https://academy.codemonarch.com/default-og-image.png";

//   return {
//     title,
//     description,
//     keywords: [
//       "SSC GK Questions",
//       "SSC General Knowledge",
//       "SSC Exam Preparation",
//       "SSC Chapterwise Practice",
//       "SSC GK Notes",
//       "CodeMonarch Academy",
//     ],
//     openGraph: {
//       title,
//       description,
//       type: "website",
//       url: "https://academy.codemonarch.com/sscsheet/gk",
//       images: [image],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [image],
//     },
//   };
// }

// ✅ Page Component
export default function Page() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "SSC GK Chapter List",
            description:
              "Comprehensive SSC GK chapter list including History, Polity, Geography, and more. Each chapter contains solved questions, notes, and video explanations.",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "History",
                url: "https://academy.codemonarch.com/sscsheet/gk?chapter=History",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Geography",
                url: "https://academy.codemonarch.com/sscsheet/gk?chapter=Geography",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Polity",
                url: "https://academy.codemonarch.com/sscsheet/gk?chapter=Polity",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Science",
                url: "https://academy.codemonarch.com/sscsheet/gk?chapter=Science",
              },
            ],
          }),
        }}
      />
      {/* Client UI */}
      <MainPage />
    </>
  );
}
