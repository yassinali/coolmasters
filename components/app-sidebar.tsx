import { User, ChevronDown, Headphones, MessageCircle, HelpCircle, Wrench, FileText, X } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"

const categoryItems = [
  { title: "Ar e Climatização", url: "#", hasDropdown: true },
  { title: "Eletrodomésticos", url: "#", hasDropdown: true },
  { title: "Eletroportáteis", url: "#", hasDropdown: true },
]

const specialItems = [
  { title: "Casa Inteligente", url: "#", color: "text-blue-500" },
  { title: "CUPONS", url: "#", color: "text-blue-500", icon: FileText },
  { title: "OUTLET", url: "#", color: "text-blue-500" },
]

const supportItems = [
  { title: "Centro de Suporte", url: "#", icon: Headphones },
  { title: "Fale Conosco", url: "#", icon: MessageCircle },
  { title: "Perguntas Frequentes", url: "#", icon: HelpCircle },
  { title: "Assistência Técnica Autorizada", url: "#", icon: Wrench },
  { title: "Registro de Produto", url: "#", icon: FileText },
]

export function AppSidebar() {
  return (
    <Sidebar
      className="bg-white shadow-lg border-r border-gray-200 z-50 md:hidden"
      style={{ backgroundColor: "white" }}
    >
      <SidebarHeader className="p-4 border-b bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700">Entre ou cadastre-se</span>
          </div>
          <SidebarTrigger>
            <X className="h-5 w-5 text-gray-600 cursor-pointer" />
          </SidebarTrigger>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0 bg-white">
        <SidebarGroup className="px-4 py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {categoryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="py-3">
                    <a
                      href={item.url}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900"
                    >
                      <span>{item.title}</span>
                      {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-4 py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {specialItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="py-3">
                    <a href={item.url} className={`flex items-center gap-2 ${item.color} hover:opacity-80`}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="border-t mt-4">
          <SidebarGroup className="px-4 py-4">
            <div className="text-gray-700 font-medium mb-3">Suporte</div>
            <SidebarGroupContent>
              <SidebarMenu>
                {supportItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="py-2">
                      <a href={item.url} className="flex items-center gap-3 text-gray-600 hover:text-gray-900">
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
