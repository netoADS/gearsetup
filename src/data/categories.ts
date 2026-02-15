export interface Category {
  name: string
  slug: string
  icon: string
  description: string
}

export const categories: Category[] = [
  {
    name: "Áudio",
    slug: "audio",
    icon: "🎧",
    description: "Headsets, microfones e caixas de som"
  },
  {
    name: "Periféricos",
    slug: "perifericos",
    icon: "⌨️",
    description: "Teclados, mouses e acessórios"
  },
  {
    name: "Iluminação",
    slug: "iluminacao",
    icon: "💡",
    description: "RGB, luminárias e fitas LED"
  },
  {
    name: "Monitores",
    slug: "monitores",
    icon: "🖥️",
    description: "Alta resolução e performance"
  }
]
