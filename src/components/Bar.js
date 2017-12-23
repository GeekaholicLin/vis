/*
 * @Author: GeekaholicLin
 * @Date: 2017-12-23 18:49:09
 * @Description: multi-rect
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Group from "./Group";
import Rect from "./Rect";
import { PREFIX } from "../constant";

export default class Bar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      data,
      top,
      left,
      width,
      height,
      rx,
      ry,
      ...rest
    } = this.props;
    return (
      <Group className={cx("bar-group", className)}>
        {data.map((d, i) => {
          return (
            <Rect
              key={`bar-${i}`}
              className={`bar-${i}-rect`}
              left={_.isFunction(left) ? left(d) : left}
              top={_.isFunction(top) ? top(d) : top}
              width={_.isFunction(width) ? width(d) : width}
              height={_.isFunction(height) ? height(d) : height}
              rx={_.isFunction(rx) ? rx(d) : rx}
              ry={_.isFunction(ry) ? ry(d) : ry}
              {...rest}
            />
          );
        })}
      </Group>
    );
  }
}
Bar.displayName = `${PREFIX}-Bar`;
Bar.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  ...Rect.propTypes
};
Bar.defaultProps = {};
