export default {
  mounted: function(el, {value}) {
    M.Tooltip.init(el, {html: value, position:'top'})
  },
  unmounted: function(el) {
    const tooltip = M.Tooltip.getInstance(el)
    if(tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  }
}