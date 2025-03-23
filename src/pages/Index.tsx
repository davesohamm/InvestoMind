
import { GlassCard } from "@/components/ui/glass-card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { 
  IndianRupee, 
  TrendingUp, 
  PieChart, 
  LineChart, 
  BrainCircuit,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-background bg-gradient-to-br from-background via-background to-accent/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-success/10 rounded-full filter blur-3xl opacity-30 animate-float delay-700"></div>
          <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-info/10 rounded-full filter blur-3xl opacity-20 animate-float delay-300"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-warning/10 rounded-full filter blur-3xl opacity-25 animate-float-slow"></div>
        </div>
        
        <GlassCard className="max-w-3xl p-10 text-center relative overflow-hidden z-10 backdrop-blur-xl border-white/30 dark:border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/0 to-success/5 opacity-40"></div>
          
          <motion.div 
            className="relative z-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="bg-primary/20 p-5 rounded-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-success/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <IndianRupee className="h-12 w-12 text-primary relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-white/20 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                ></motion.div>
              </div>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl font-bold mb-4 text-foreground flex items-center justify-center">
              InvestoMind
              <Sparkles className="h-7 w-7 ml-2 text-primary" />
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground mb-10 max-w-lg mx-auto">
              Your AI-powered investment platform for the Indian markets
            </motion.p>
            
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
            >
              <motion.div 
                variants={itemVariants}
                className="p-5 rounded-lg bg-background/60 border hover:border-primary/50 transition-all duration-300 hover:bg-accent/10 group hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <PieChart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-1">Portfolio Analysis</h3>
                <p className="text-sm text-muted-foreground">Track and analyze your investments with precision</p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="p-5 rounded-lg bg-background/60 border hover:border-primary/50 transition-all duration-300 hover:bg-accent/10 group hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-1">AI Advisor</h3>
                <p className="text-sm text-muted-foreground">Get personalized investment advice tailored to Indian markets</p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="p-5 rounded-lg bg-background/60 border hover:border-primary/50 transition-all duration-300 hover:bg-accent/10 group hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-1">Market Insights</h3>
                <p className="text-sm text-muted-foreground">Stay updated with Indian market trends and analysis</p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="p-5 rounded-lg bg-background/60 border hover:border-primary/50 transition-all duration-300 hover:bg-accent/10 group hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-1">Watchlist</h3>
                <p className="text-sm text-muted-foreground">Monitor your favorite Indian stocks in real-time</p>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-muted-foreground mt-10 flex items-center justify-center"
            >
              <div className="relative inline-flex">
                <span className="animate-pulse">Redirecting to dashboard</span>
                <span className="ml-1 animate-bounce delay-100">.</span>
                <span className="ml-0.5 animate-bounce delay-200">.</span>
                <span className="ml-0.5 animate-bounce delay-300">.</span>
              </div>
            </motion.div>
          </motion.div>
        </GlassCard>
      </div>
    </PageTransition>
  );
};

export default Index;
