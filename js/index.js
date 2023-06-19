import { Router } from './router.js'

const router = new Router()
router.add("/", "/pages/home.html")
router.add("/about", "/pages/about.html")
router.add("/contact", "/pages/contact.html")
router.add("/work", "/pages/work.html")

//const routes = {
//  "/": "/pages/home.html",
//  "/about": "/pages/about.html",
//  "/contact": "/pages/contact.html",
//  "/work": "/pages/work.html"
//}
//
router.handle()

window.onpopstate = () => router.handle()
window.route = () => router.route()