The files in HOC directory do the things like simplifying component interaction.

And the result and internal interaction using these HOCs can be simply shown as the followings.

```bash
/**
 * ================= Component Tree =================
 *
 * ChartProvider[channel="chart"](propvider)
 *     XAxisHOC[channel="chart"] <-----props---- merge mapContextToProps and XAxisHOC defaulltProps/props(highest)
 *     ZoomHOC[channel="chart"]
 *     BrushProviderHOC[channel="chart"]--
 *                                        |   change chart channel __originalProps__ property
 *                                        v   and itself props to brush context
 *        BrushProvider[channel="brush"](propvider)
 *            BrushHOC[channel="brush"]
 *              XAxisHOC[channel="brush"] <-----props---- merge mapContextToProps, XAxisHOC defaulltProps/props and mapPropsToBrush(highest)
 *              AreaHOC[channel="brush"]
 *
 * ==================================================
 */
```
