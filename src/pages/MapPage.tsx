import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, Bed, Bath, Square, Navigation, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { properties } from '@/data/properties';
import { BookingWizard } from '@/components/BookingWizard';

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom gold marker icon
const goldIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOC4zIDAgMjMgNC43IDIzIDEwLjVDMjMgMTYuNSAxMi41IDQxIDEyLjUgNDFDMTIuNSA0MSAyIDYuNSAyIDEwLjVDMiA0LjcgNi43IDAgMTIuNSAwWiIgZmlsbD0iI0M0OEEyQSIvPgo8Y2lyY2xlIGN4PSIxMi41IiBjeT0iMTAuNSIgcj0iNSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
  iconRetinaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOC4zIDAgMjMgNC43IDIzIDEwLjVDMjMgMTYuNSAxMi41IDQxIDEyLjUgNDFDMTIuNSA0MSAyIDYuNSAyIDEwLjVDMiA0LjcgNi43IDAgMTIuNSAwWiIgZmlsbD0iI0M0OEEyQSIvPgo8Y2lyY2xlIGN4PSIxMi41IiBjeT0iMTAuNSIgcj0iNSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const goldIconSelected = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDBDMjMuMyAwIDMwIDYuNyAzMCAxNUMzMCAxNS41IDE1IDQ4IDE1IDQ4QzE1IDQ4IDAgMTYuNSAwIDE1QzAgNi43IDYuNyAwIDE1IDBaIiBmaWxsPSIjRTlCNDNGIi8+CjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjYiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
  iconRetinaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDBDMjMuMyAwIDMwIDYuNyAzMCAxNUMzMCAxNS41IDE1IDQ4IDE1IDQ4QzE1IDQ4IDAgMTYuNSAwIDE1QzAgNi43IDYuNyAwIDE1IDBaIiBmaWxsPSIjRTlCNDNGIi8+CjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjYiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
  shadowUrl: markerShadow,
  iconSize: [30, 48],
  iconAnchor: [15, 48],
  popupAnchor: [1, -40],
  shadowSize: [41, 41]
});

// Map controller to handle programmatic zoom/pan
function MapController({ selectedProperty, properties }: { selectedProperty: string | null; properties: typeof import('@/data/properties').properties }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedProperty) {
      const property = properties.find(p => p.id === selectedProperty);
      if (property) {
        map.flyTo([property.geoCoordinates.lat, property.geoCoordinates.lng], 14, {
          duration: 1.5
        });
      }
    } else {
      // Reset to US view
      map.flyTo([39.8283, -98.5795], 4, {
        duration: 1.5
      });
    }
  }, [selectedProperty, map, properties]);

  return null;
}

export function MapPage() {
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingProperty, setBookingProperty] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePropertyHover = (propertyId: string | null) => {
    setHoveredProperty(propertyId);
  };

  const handleScheduleTour = (propertyName: string) => {
    setBookingProperty(propertyName);
    setIsBookingOpen(true);
  };

  // US center coordinates
  const usCenter: [number, number] = [39.8283, -98.5795];

  return (
    <div className="min-h-screen bg-neutral-100 pt-16 sm:pt-20">
      {/* Header */}
      <motion.div 
        className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-white shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary-blue">
                Property Map
              </h1>
              <p className="text-muted-blue text-sm sm:text-base">
                Explore {properties.length} properties across {new Set(properties.map(p => p.city)).size} cities
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-blue/60" />
                <Input
                  placeholder="Search properties or cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-blue/60 hover:text-muted-blue"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? 'bg-primary-blue text-white' : ''}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Map Container */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] sm:h-[calc(100vh-180px)]">
        {/* Map Area - Leaflet */}
        <div className="flex-1 relative">
          <MapContainer
            center={usCenter}
            zoom={4}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController selectedProperty={selectedProperty} properties={filteredProperties} />
            
            {filteredProperties.map((property) => {
              const isHovered = hoveredProperty === property.id;
              const isSelected = selectedProperty === property.id;
              
              return (
                <Marker
                  key={property.id}
                  position={[property.geoCoordinates.lat, property.geoCoordinates.lng]}
                  icon={isHovered || isSelected ? goldIconSelected : goldIcon}
                  eventHandlers={{
                    mouseover: () => handlePropertyHover(property.id),
                    mouseout: () => handlePropertyHover(null),
                    click: () => setSelectedProperty(isSelected ? null : property.id),
                  }}
                >
                  <Popup>
                    <div className="min-w-[200px]">
                      <img
                        src={property.heroImage}
                        alt={property.name}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-semibold text-primary-blue text-sm">
                        {property.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {property.city}, {property.state}
                      </p>
                      <p className="text-sm font-bold text-gold mt-1">
                        ${property.priceRange.min.toLocaleString()}/mo
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Link to={`/properties/${property.slug}`} className="flex-1">
                          <Button size="sm" variant="outline" className="w-full text-xs">
                            View
                          </Button>
                        </Link>
                        <Button 
                          size="sm" 
                          className="bg-gold text-primary-blue text-xs"
                          onClick={() => handleScheduleTour(property.name)}
                        >
                          Tour
                        </Button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Map Controls Overlay */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-[400]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedProperty(null)}
              className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-primary-blue hover:bg-gray-50"
              title="Reset View"
            >
              <Navigation className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Property List Sidebar */}
        <motion.div 
          className="w-full lg:w-80 xl:w-96 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 overflow-y-auto max-h-[40vh] lg:max-h-none"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-3 sm:p-4">
            <h2 className="font-semibold text-primary-blue mb-3 sm:mb-4 text-sm sm:text-base">
              {filteredProperties.length} Properties
            </h2>
            <div className="space-y-4">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => handlePropertyHover(property.id)}
                  onMouseLeave={() => handlePropertyHover(null)}
                  onClick={() => setSelectedProperty(property.id)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    hoveredProperty === property.id || selectedProperty === property.id
                      ? 'border-gold bg-gold/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={property.heroImage}
                      alt={property.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-primary-blue truncate">
                        {property.name}
                      </h3>
                      <p className="text-sm text-muted-blue">
                        {property.city}, {property.state}
                      </p>
                      <p className="text-sm font-bold text-gold mt-1">
                        ${property.priceRange.min.toLocaleString()}/mo
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-blue">
                        <span className="flex items-center gap-1">
                          <Bed className="w-3 h-3" /> {property.bedrooms}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-3 h-3" /> {property.bathrooms}
                        </span>
                        <span className="flex items-center gap-1">
                          <Square className="w-3 h-3" /> {property.sqft}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link to={`/properties/${property.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="bg-gold text-primary-blue hover:bg-gold-light"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScheduleTour(property.name);
                      }}
                    >
                      Tour
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Wizard */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setBookingProperty(null);
        }}
        propertyName={bookingProperty || undefined}
      />
    </div>
  );
}
