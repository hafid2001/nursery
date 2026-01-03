import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Star, 
  Heart, 
  Users, 
  BookOpen, 
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Play,
  Shield,
  Clock,
  Utensils,
  GraduationCap,
  Baby,
  Palette,
  Music,
  TreeDeciduous,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const websiteData = {
  hero: {
    title: "حضانة نجوم المستقبل",
    subtitle: "حيث يبدأ مستقبل طفلك المشرق",
    description: "بيئة تعليمية آمنة ومحفزة تنمي إبداع طفلك وتبني شخصيته بأحدث الأساليب التربوية",
    ctaText: "سجّل طفلك الآن",
    secondaryCtaText: "تعرف علينا",
  },
  stats: [
    { number: "+500", label: "طفل سعيد" },
    { number: "+50", label: "معلمة متخصصة" },
    { number: "+10", label: "سنوات خبرة" },
    { number: "100%", label: "رضا الأهالي" },
  ],
  about: {
    title: "من نحن",
    subtitle: "نحن عائلة واحدة كبيرة",
    description: "في حضانة نجوم المستقبل، نؤمن بأن كل طفل هو نجم فريد يستحق الرعاية والاهتمام. فريقنا من المربيات المتخصصات يعمل على توفير بيئة تعليمية محفزة تجمع بين المرح والتعلم.",
    highlights: [
      { icon: Shield, text: "بيئة آمنة ومراقبة على مدار الساعة" },
      { icon: GraduationCap, text: "مناهج تعليمية معتمدة دولياً" },
      { icon: Utensils, text: "وجبات صحية ومتوازنة" },
      { icon: Users, text: "معلمات مؤهلات ومدربات" },
    ],
  },
  programs: [
    {
      name: "الرضّع",
      ages: "٦ أشهر - ١٢ شهر",
      description: "رعاية لطيفة ومحبة تدعم نمو طفلك في أولى مراحل حياته",
      icon: Baby,
      color: "from-[hsl(20,80%,92%)] to-[hsl(20,70%,85%)]",
    },
    {
      name: "الدارجين",
      ages: "١ - ٢ سنة",
      description: "استكشاف واكتشاف من خلال التعلم باللعب",
      icon: Sparkles,
      color: "from-[hsl(270,50%,92%)] to-[hsl(270,45%,85%)]",
    },
    {
      name: "ما قبل الروضة",
      ages: "٣ - ٤ سنوات",
      description: "تأسيس قوي يجهز طفلك للمرحلة التالية",
      icon: BookOpen,
      color: "from-[hsl(160,50%,90%)] to-[hsl(160,45%,82%)]",
    },
    {
      name: "التمهيدي",
      ages: "٤ - ٦ سنوات",
      description: "برنامج متقدم لضمان الاستعداد للمدرسة",
      icon: GraduationCap,
      color: "from-[hsl(200,80%,92%)] to-[hsl(200,70%,85%)]",
    },
  ],
  activities: [
    { icon: Palette, name: "الفنون والحرف", color: "bg-peach" },
    { icon: Music, name: "الموسيقى والحركة", color: "bg-lavender" },
    { icon: BookOpen, name: "القراءة والقصص", color: "bg-mint" },
    { icon: TreeDeciduous, name: "الأنشطة الخارجية", color: "bg-sky" },
  ],
  testimonials: [
    {
      name: "أم سارة",
      role: "والدة سارة، ٤ سنوات",
      quote: "حضانة نجوم المستقبل كانت نعمة لعائلتنا. سارة تحب الذهاب كل يوم وتطورت كثيراً!",
      avatar: "س",
    },
    {
      name: "أم محمد",
      role: "والدة محمد، ٣ سنوات",
      quote: "المعلمات رائعات ويهتممن حقاً بكل طفل. لا نستطيع طلب حضانة أفضل.",
      avatar: "م",
    },
    {
      name: "أم يوسف",
      role: "والدة يوسف، ٥ سنوات",
      quote: "المنهج ممتاز وابني دائماً متحمس لمشاركة ما تعلمه.",
      avatar: "ي",
    },
  ],
  features: [
    {
      icon: Clock,
      title: "ساعات مرنة",
      description: "نوفر ساعات عمل مرنة تناسب جدول الأهالي",
    },
    {
      icon: Shield,
      title: "أمان تام",
      description: "كاميرات مراقبة وأنظمة أمان متطورة",
    },
    {
      icon: Heart,
      title: "رعاية فردية",
      description: "اهتمام خاص بكل طفل حسب احتياجاته",
    },
  ],
};

const PublicWebsite = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section animation
    gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1, ease: "power3.out" });
    gsap.from(".hero-subtitle", { opacity: 0, y: 50, duration: 1, delay: 0.2, ease: "power3.out" });
    gsap.from(".hero-description", { opacity: 0, y: 50, duration: 1, delay: 0.4, ease: "power3.out" });
    gsap.from(".hero-cta", { opacity: 0, y: 50, duration: 1, delay: 0.6, ease: "power3.out" });
    gsap.from(".hero-stats > div", { 
      opacity: 0, 
      y: 50, 
      duration: 0.8, 
      ease: "power3.out", 
      stagger: 0.2, 
      scrollTrigger: {
        trigger: ".hero-stats",
        start: "top 80%",
        scrub : true
      }
    });

    // General scroll animation for sections
    gsap.utils.toArray(".animate-on-scroll").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
          scrub : true
        },
      });
    });

  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % websiteData.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + websiteData.testimonials.length) % websiteData.testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background font-sans" dir="rtl">


      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">
                نجوم المستقبل
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors font-medium">من نحن</a>
              <a href="#programs" className="text-muted-foreground hover:text-primary transition-colors font-medium">البرامج</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors font-medium">آراء الأهالي</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/register">
                <Button variant="ghost" className="rounded-full font-medium">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link to="/login">
                <Button className="rounded-full px-6 font-medium shadow-lg shadow-primary/25">
                  سجّل الآن
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-transparent to-lavender/20" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-lavender/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-mint/30 rounded-full blur-3xl" />
        
        {/* Floating shapes */}
        <div className="absolute top-20 right-[15%] w-16 h-16 bg-peach rounded-2xl rotate-12 opacity-60" />
        <div className="absolute bottom-32 left-[20%] w-12 h-12 bg-sky rounded-full opacity-50" />
        <div className="absolute top-40 left-[10%] w-8 h-8 bg-mint rounded-lg rotate-45 opacity-70" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-right">
              <Badge variant="secondary" className="mb-6 rounded-full px-5 py-2 text-sm font-medium bg-primary/10 text-primary border-0">
                🌟 الحضانة الأولى في المنطقة
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight hero-title">
                {websiteData.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-primary font-semibold mb-4 hero-subtitle">
                {websiteData.hero.subtitle}
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed hero-description">
                {websiteData.hero.description}
              </p>
              <div className="flex flex-wrap gap-4 hero-cta">
                <Link to="/login">
                  <Button size="lg" className="rounded-full text-lg px-8 gap-2 shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all">
                    {websiteData.hero.ctaText}
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="rounded-full text-lg px-8 gap-2 border-2">
                  <Play className="w-5 h-5" />
                  {websiteData.hero.secondaryCtaText}
                </Button>
              </div>
            </div>
            
            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Main circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-lavender to-mint/50 rounded-[3rem] transform rotate-3" />
                <div className="absolute inset-4 bg-gradient-to-br from-card via-card to-card/80 rounded-[2.5rem] shadow-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-primary/60 rounded-3xl flex items-center justify-center shadow-xl">
                      <Star className="w-16 h-16 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">مرحباً بكم</h3>
                    <p className="text-muted-foreground">في عالم من المرح والتعلم</p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-peach rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-10 h-10 text-peach-foreground" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-sky rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-sky-foreground" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 hero-stats">
            {websiteData.stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.number}</p>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-secondary/30 to-background animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual side */}
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[4/5] bg-gradient-to-br from-lavender to-lavender/50 rounded-3xl flex items-center justify-center p-6">
                    <Users className="w-20 h-20 text-lavender-foreground" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-peach to-peach/50 rounded-3xl flex items-center justify-center">
                    <Heart className="w-16 h-16 text-peach-foreground" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square bg-gradient-to-br from-mint to-mint/50 rounded-3xl flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-mint-foreground" />
                  </div>
                  <div className="aspect-[4/5] bg-gradient-to-br from-sky to-sky/50 rounded-3xl flex items-center justify-center p-6">
                    <BookOpen className="w-20 h-20 text-sky-foreground" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content side */}
            <div className="order-1 lg:order-2">
              <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1 bg-primary/10 text-primary border-0">
                {websiteData.about.title}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {websiteData.about.subtitle}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {websiteData.about.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {websiteData.about.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <highlight.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium text-sm">{highlight.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1 bg-primary/10 text-primary border-0">
              برامجنا
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              برامج مصممة لكل مرحلة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              برامج تعليمية مناسبة لكل فئة عمرية، مصممة لتنمية مهارات طفلك بشكل متكامل
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {websiteData.programs.map((program, index) => (
              <Card key={index} className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className={`h-40 bg-gradient-to-br ${program.color} flex items-center justify-center`}>
                    <program.icon className="w-16 h-16 text-foreground/70 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {program.name}
                    </h3>
                    <Badge variant="secondary" className="rounded-full mb-3 bg-secondary text-secondary-foreground">
                      {program.ages}
                    </Badge>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              أنشطة متنوعة وممتعة
            </h2>
            <p className="text-lg text-muted-foreground">
              نوفر أنشطة متنوعة تنمي مواهب طفلك وتكتشف إبداعاته
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {websiteData.activities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all">
                <div className={`w-14 h-14 rounded-xl ${activity.color} flex items-center justify-center`}>
                  <activity.icon className="w-7 h-7 text-foreground/80" />
                </div>
                <span className="text-foreground font-semibold">{activity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {websiteData.features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-3xl bg-gradient-to-b from-card to-secondary/20 border border-border/50">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-primary/5 via-lavender/20 to-mint/10 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1 bg-primary/10 text-primary border-0">
              آراء الأهالي
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ماذا يقول أولياء الأمور
            </h2>
            <p className="text-lg text-muted-foreground">
              انضم لمئات العائلات السعيدة التي وثقت بنا
            </p>
          </div>
          
          {/* Testimonial Carousel */}
          <div className="relative max-w-3xl mx-auto">
            <Card className="rounded-3xl border-0 shadow-2xl bg-card">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-primary/30 mb-6" />
                <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                  "{websiteData.testimonials[currentTestimonial].quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
                    {websiteData.testimonials[currentTestimonial].avatar}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{websiteData.testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-muted-foreground">{websiteData.testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={prevTestimonial}>
                <ChevronRight className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                {websiteData.testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentTestimonial ? "bg-primary w-8" : "bg-primary/30"
                    }`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={nextTestimonial}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] bg-gradient-to-br from-primary via-primary to-primary/80 p-12 md:p-16 text-center overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                هل أنت مستعد لبداية رحلة طفلك؟
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                سجّل الآن وامنح طفلك أفضل بداية تعليمية في بيئة آمنة ومحفزة
              </p>
              <Link to="/login">
                <Button size="lg" variant="secondary" className="rounded-full text-lg px-10 gap-2 shadow-xl">
                  ابدأ التسجيل
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">نجوم المستقبل</span>
              </div>
              <p className="text-background/70 leading-relaxed">
                نحن ملتزمون بتوفير أفضل رعاية تعليمية لأطفالكم في بيئة آمنة ومحفزة
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-background/70 hover:text-background transition-colors">من نحن</a></li>
                <li><a href="#programs" className="text-background/70 hover:text-background transition-colors">البرامج</a></li>
                <li><a href="#testimonials" className="text-background/70 hover:text-background transition-colors">آراء الأهالي</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
              <ul className="space-y-3 text-background/70">
                <li>الأحد - الخميس: ٧:٠٠ ص - ٦:٠٠ م</li>
                <li>info@futurestars.sa</li>
                <li>+966 50 123 4567</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-background/20 text-center">
            <p className="text-background/60">
              © ٢٠٢٤ حضانة نجوم المستقبل. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicWebsite;
