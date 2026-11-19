import { LinkPill } from "@/components/link-pill";
import { latestBlogPost, type BlogPost } from "@/site";

// The title gets shorter as the screen gets narrower so the pill always
// fits inside the page gutter: <375px, 375–639px, and 640px and wider.
function getResponsiveTitles(post: BlogPost) {
  return [
    { text: post.compactTitle, className: "xs:hidden" },
    { text: post.shortTitle, className: "hidden xs:flex sm:hidden" },
    { text: post.title, className: "hidden sm:flex" },
  ];
}

export function BlogPostPill({
  className,
  post = latestBlogPost,
}: {
  className?: string;
  post?: BlogPost;
}) {
  return (
    <LinkPill
      accessibilityHint={`Opens the article on the ${post.publisher}`}
      accessibilityLabel={`New post on the ${post.publisher}: ${post.title}`}
      className={className}
      href={post.href}
      label={getResponsiveTitles(post)}
      leading={{ type: "badge", text: "New post" }}
      tone="accent"
    />
  );
}
