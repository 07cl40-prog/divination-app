
const fs = require('fs');
let c = fs.readFileSync('C:/Users/Administrator/Desktop/divination-app/src/App.jsx','utf8');

const R = [
  // === 1. PAGE BACKGROUND ===
  ['bg-[#FFFBF5]', 'bg-[#F5F1ED]'],
  ['bg-[#FFF5EB]', 'bg-[#F5F1ED]'],
  ['bg-[#FFF8F0]', 'bg-[#FAF7F4]'],
  ['bg-[#F8F0E6]', 'bg-[#F5F1ED]'],
  ['bg-[#F5EDE0]', 'bg-[#FAF7F4]'],
  ['bg-[#EDE0D0]', 'bg-[#FAF7F4]'],
  ['bg-[#E0D5C8]', 'bg-[#E5E0DB]'],

  // === 2. TEXT COLORS ===
  ['text-gray-400', 'text-[#666666]'],
  ['text-gray-500', 'text-[#666666]'],
  ['text-gray-600', 'text-[#666666]'],
  ['text-gray-700', 'text-[#333333]'],
  ['text-[#1A1A2E]', 'text-[#333333]'],

  // === 3. BORDER COLORS ===
  ['border-[#F0E6D8]', 'border-[#E5E0DB]'],
  ['border-[#EDE5D8]', 'border-[#E5E0DB]'],
  ['border-[#E8DDD0]', 'border-[#E5E0DB]'],
  ['border-[#E0D5C8]', 'border-[#E5E0DB]'],
  ['border-red-200/30', 'border-[#E5E0DB]'],
  ['border-red-100/20', 'border-[#E5E0DB]'],
  ['border-red-200/40', 'border-[#E5E0DB]'],
  ['border-red-200', 'border-[#E5E0DB]'],
  ['border-red-300', 'border-[#D4B978]'],

  // === 4. AMBER/RED → GOLD/RED (Pop Mart → Luxury) ===
  ['text-[#FFB800]', 'text-[#B8860B]'],
  ['text-[#FF4444]', 'text-[#B8860B]'],
  ['text-[#E53935]', 'text-[#B8860B]'],
  ['text-[#D32F2F]', 'text-[#8C6D1F]'],
  ['text-red-400/60', 'text-[#666666]'],
  ['text-red-400/70', 'text-[#666666]'],
  ['text-red-400', 'text-[#666666]'],

  // === 5. BACKGROUND COLORS (reset) ===
  ['bg-[#1A1020]', 'bg-[#F5F1ED]'],
  ['bg-[#2D1F35]', 'bg-[#E5E0DB]'],
  ['bg-[#0D0D14]', 'bg-[#F5F1ED]'],
  ['bg-[#1A1A28]', 'bg-[#FAF7F4]'],
  ['bg-red-50', 'bg-[#FAF7F4]'],
  ['bg-amber-50', 'bg-[#FAF7F4]'],
  ['bg-[#FFFAF5]', 'bg-[#F5F1ED]'],

  // === 6. RESET any remaining stone/gray classes ===
  ['bg-white/98', 'bg-[#F5F1ED]'],
  ['bg-white/95', 'bg-[#F5F1ED]'],
  ['bg-white/90', 'bg-[#FAF7F4]'],
  ['bg-white/80', 'bg-[#FAF7F4]'],
  ['bg-black/30', 'bg-[#F5F1ED]'],
  ['bg-black/20', 'bg-[#F5F1ED]'],
  ['bg-black/10', 'bg-[#F5F1ED]'],
  ['bg-black/5', 'bg-[#F5F1ED]'],
  ['bg-white', 'bg-[#FAF7F4]'],

  // === 7. GRADIENT BACKGROUNDS ===
  ['from-white to-[#FFF5EB]', 'from-[#F5F1ED] to-[#FAF7F4]'],
  ['from-red-50 to-white', 'from-[#FAF7F4] to-[#F5F1ED]'],
  ['from-amber-50 to-white', 'from-[#FAF7F4] to-[#F5F1ED]'],
  ['from-[#FFFBF5] to-white', 'from-[#F5F1ED] to-[#FAF7F4]'],
  ['from-[#FFFBF5] to-[#FFF5EB]', 'from-[#F5F1ED] to-[#FAF7F4]'],
  ['bg-gradient-to-br from-white to-[#FFF8F0]', 'bg-gradient-to-br from-[#F5F1ED] to-[#FAF7F4]'],
  ['bg-gradient-to-br from-[#F5F1ED] to-[#FFF8F0]', 'bg-gradient-to-br from-[#F5F1ED] to-[#FAF7F4]'],
  ['bg-gradient-to-br from-red-50 to-white', 'bg-gradient-to-br from-[#FAF7F4] to-[#F5F1ED]'],
  ['bg-gradient-to-br from-amber-50 to-white', 'bg-gradient-to-br from-[#FAF7F4] to-[#F5F1ED]'],

  // === 8. NAVBAR ===
  ['bg-[#F5F1ED]/95 backdrop-blur-xl border-b border-[#E5E0DB]', 'bg-[#F5F1ED] border-b border-[#E5E0DB]'],
  ['hover:bg-red-50', 'hover:bg-[#FAF7F4]'],
  ['bg-[#FAF7F4] hover:bg-red-50 border border-[#E5E0DB]', 'bg-[#FAF7F4] hover:bg-[#F5F1ED] border border-[#E5E0DB]'],
  ['bg-[#FAF7F4] border border-[#E5E0DB] flex items-center justify-center text-gray-600 hover:text-[#E53935]', 'bg-[#FAF7F4] border border-[#E5E0DB] flex items-center justify-center text-[#666666] hover:text-[#B8860B]'],
  ['bg-[#FAF7F4] border border-[#E5E0DB] flex items-center justify-center text-gray-600', 'bg-[#FAF7F4] border border-[#E5E0DB] flex items-center justify-center text-[#666666]'],
  ['hover:text-[#E53935]', 'hover:text-[#B8860B]'],

  // === 9. CTA BUTTONS ===
  ['bg-gradient-to-r from-[#FF4444] to-[#FF6B35] hover:from-[#FF3333] hover:to-[#FF5530]', 'bg-[#8B1A1A] hover:bg-[#A84444]'],
  ['bg-[#FF4444]', 'bg-[#8B1A1A]'],
  ['hover:bg-[#E53935] hover:text-white', 'hover:bg-[#A84444] hover:text-white'],
  ['hover:bg-[#FF5555]', 'hover:bg-[#A84444]'],
  ['hover:bg-[#FF6666]', 'hover:bg-[#A84444]'],
  ['border-[#FF4444]', 'border-[#8B1A1A]'],
  ['border-[#CC0000]', 'border-[#8B1A1A]'],
  ['border-[#FFCCCC]', 'border-[#D4B978]'],
  ['shadow-[0_0_80px_rgba(255,68,68,0.08)]', 'shadow-[0_0_40px_rgba(184,134,11,0.06)]'],
  ['shadow-red-200/30', 'shadow-[#D4B978]/20'],
  ['shadow-red-100/30', 'shadow-[#D4B978]/10'],
  ['shadow-lg shadow-red-200/30', 'shadow-lg shadow-[#D4B978]/20'],
  ['shadow-[#D4B978]/20', 'shadow-[#D4B978]/20'],
  ['shadow-[#D4B978]/10', 'shadow-[#D4B978]/10'],

  // === 10. NEWSLETTER / CTA GRADIENT ===
  ['from-[#FF4444] to-[#FF6B35]', 'from-[#8B1A1A] to-[#8C6D1F]'],
  ['from-[#FF4444] to-[#FF6B35]', 'from-[#8B1A1A] to-[#8C6D1F]'],
  ['from-[#FF3333] to-[#FF5530]', 'from-[#8B1A1A] to-[#8C6D1F]'],
  ['hover:from-[#FF3333] hover:to-[#FF5530]', 'hover:from-[#A84444] hover:to-[#8C6D1F]'],
  ['from-[#8B1A1A] to-[#8C6D1F] text-white', 'from-[#8B1A1A] to-[#8C6D1F] text-white'],
  ['text-white', 'text-white'],
  ['from-[#FAF7F4] to-[#F5F1ED]', 'from-[#FAF7F4] to-[#F5F1ED]'],

  // === 11. INPUT FIELDS ===
  ['bg-[#FFF8F0] border border-[#E8DDD0] text-[#333333] placeholder-gray-400', 'bg-[#FAF7F4] border border-[#E5E0DB] text-[#333333] placeholder-[#999999]'],
  ['bg-[#FAF7F4] border border-[#E8DDD0] text-[#333333]', 'bg-[#FAF7F4] border border-[#E5E0DB] text-[#333333]'],
  ['bg-[#FFF8F0] border border-[#E8DDD0] text-[#333333]', 'bg-[#FAF7F4] border border-[#E5E0DB] text-[#333333]'],
  ['bg-[#FAF7F4] border border-[#E5E0DB] text-[#333333] placeholder-gray-400', 'bg-[#FAF7F4] border border-[#E5E0DB] text-[#333333] placeholder-[#999999]'],
  ['bg-[#FAF7F4] border border-[#E8DDD0] rounded-xl', 'bg-[#FAF7F4] border border-[#E5E0DB] rounded-xl'],
  ['bg-[#F5EDE0] border border-[#E8DDD0] rounded-lg', 'bg-[#FAF7F4] border border-[#E5E0DB] rounded-lg'],

  // === 12. STAR / HEART RATING ===
  ['fill-[#FFB800] text-[#FFB800]', 'fill-[#B8860B] text-[#B8860B]'],
  ['text-[#FFB800]', 'text-[#B8860B]'],
  ['fill-[#FF4444] text-[#FF4444]', 'fill-[#8B1A1A] text-[#8B1A1A]'],
  ['text-[#FF4444]', 'text-[#8B1A1A]'],

  // === 13. ADMIN PANEL (keep dark) ===
  ['bg-[#0D0D14]/90', 'bg-[#0D0D14]/90'],

  // === 14. FOOTER ===
  ['bg-[#F5F1ED] border-t border-[#E5E0DB]', 'bg-[#F5F1ED] border-t border-[#E5E0DB]'],

  // === 15. PRODUCT CARDS ===
  ['bg-white border border-[#E5E0DB]', 'bg-[#FAF7F4] border border-[#D4B978]'],
  ['bg-[#FAF7F4] border border-[#D4B978] hover:shadow-lg', 'bg-[#FAF7F4] border border-[#D4B978] hover:shadow-[#D4B978]/20'],
  ['bg-[#FAF7F4] border border-[#E5E0DB]', 'bg-[#FAF7F4] border border-[#D4B978]'],
  ['hover:bg-[#EDE0D0]', 'hover:bg-[#F5F1ED]'],

  // === 16. MODAL ===
  ['bg-[#FAF7F4] border border-[#E5E0DB]', 'bg-[#FAF7F4] border border-[#D4B978]'],

  // === 17. SECTION DIVIDERS ===
  ['border-t border-[#E5E0DB]', 'border-t border-[#E5E0DB]'],

  // === 18. NAV LINKS TEXT ===
  ['text-[#333333] font-medium', 'text-[#333333]'],
  ['text-[#333333] text-sm', 'text-[#666666] text-sm'],

  // === 19. RADIAL GRADIENT ACCENT ===
  ['radial-gradient(ellipse 70% 60% at 65% 50%, rgba(255,77,77,0.08) 0%, transparent 70%)', 'radial-gradient(ellipse 70% 60% at 65% 50%, rgba(184,134,11,0.05) 0%, transparent 70%)'],
];

let n = 0;
for (const [old, neu] of R) {
  if (c.includes(old)) { c = c.split(old).join(neu); n++; }
}
fs.writeFileSync('C:/Users/Administrator/Desktop/divination-app/src/App.jsx', c, 'utf8');
console.log(n + ' replacements done');
