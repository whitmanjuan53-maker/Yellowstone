import { Link } from 'react-router-dom';
import { Search, Calendar, FileText } from 'lucide-react';

export function MobileStickyCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden pb-safe"
      style={{
        background: 'white',
        borderTop: '1px solid rgba(43, 57, 95, 0.1)',
        boxShadow: '0 -4px 16px rgba(43, 57, 95, 0.1)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex items-stretch divide-x divide-gray-100">
        {/* View */}
        <Link
          to="/properties"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors active:scale-95"
          style={{ color: 'var(--muted-blue)' }}
        >
          <Search style={{ width: '20px', height: '20px' }} strokeWidth={1.75} />
          <span className="text-[11px] font-semibold tracking-wide uppercase">View</span>
        </Link>

        {/* Tour — Gold center */}
        <Link
          to="/tour"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 active:scale-95"
          style={{ background: 'var(--gold)', color: 'var(--primary-blue)' }}
        >
          <Calendar style={{ width: '20px', height: '20px' }} strokeWidth={2} />
          <span className="text-[11px] font-bold tracking-wide uppercase">Tour</span>
        </Link>

        {/* Apply */}
        <Link
          to="/contact"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors active:scale-95"
          style={{ color: 'var(--muted-blue)' }}
        >
          <FileText style={{ width: '20px', height: '20px' }} strokeWidth={1.75} />
          <span className="text-[11px] font-semibold tracking-wide uppercase">Apply</span>
        </Link>
      </div>
    </div>
  );
}
