export function TrustStrip() {
  const items = [
    'Professionally Managed',
    'Transparent Leasing',
    'Secure Online Applications',
  ];

  return (
    <section className="bg-white border-t border-b border-gray-100 py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
          {items.map((item, index) => (
            <div key={item} className="flex items-center gap-4">
              {index > 0 && (
                <span
                  className="hidden sm:block w-px h-4"
                  style={{ background: 'var(--gold)', opacity: 0.7 }}
                />
              )}
              <span
                className="text-[10px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.16em] uppercase text-center"
                style={{ color: 'var(--muted-blue)' }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
