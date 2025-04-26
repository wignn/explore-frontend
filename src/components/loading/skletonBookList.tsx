import {motion} from 'framer-motion';
import Skeleton from '@/components/loading/skletonBook';


export function BookListSkeleton() {
    return (
      <div className="mx-auto min-h-screen w-full">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-y-8">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-gray-800/80 backdrop-blur-sm"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-xl bg-gray-700/70">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
              </div>
              <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
                <Skeleton className="h-5 w-full rounded bg-gray-700/70" />
                <Skeleton className="h-4 w-3/4 rounded bg-gray-700/70" />
                <div className="flex justify-between pt-1">
                  <Skeleton className="h-4 w-1/3 rounded bg-gray-700/70" />
                  <Skeleton className="h-4 w-1/4 rounded bg-gray-700/70" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  