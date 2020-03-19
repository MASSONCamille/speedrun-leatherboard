import React, { forwardRef } from "react";
import {
    MdAdd,
    MdCheck,
    MdClear,
    MdDelete,
    MdChevronRight,
    MdEdit,
    MdFilterList,
    MdFirstPage,
    MdLastPage,
    MdChevronLeft,
    MdArrowDownward,
    MdRemove,
    MdSearch,
    MdViewColumn
} from "react-icons/md";
import { TiExport } from "react-icons/ti";

const tableIcons = {
    Add: forwardRef<SVGSVGElement>((props, ref) => <MdAdd {...props} />),
    Check: forwardRef<SVGSVGElement>((props, ref) => <MdCheck {...props} />),
    Clear: forwardRef<SVGSVGElement>((props, ref) => <MdClear {...props} />),
    Delete: forwardRef<SVGSVGElement>((props, ref) => <MdDelete {...props} />),
    DetailPanel: forwardRef<SVGSVGElement>((props, ref) => <MdChevronRight {...props} />),
    Edit: forwardRef<SVGSVGElement>((props, ref) => <MdEdit {...props} />),
    Export: forwardRef<SVGSVGElement>((props, ref) => <TiExport {...props} />),
    Filter: forwardRef<SVGSVGElement>((props, ref) => <MdFilterList {...props} />),
    FirstPage: forwardRef<SVGSVGElement>((props, ref) => <MdFirstPage {...props} />),
    LastPage: forwardRef<SVGSVGElement>((props, ref) => <MdLastPage {...props} />),
    NextPage: forwardRef<SVGSVGElement>((props, ref) => <MdChevronRight {...props} />),
    PreviousPage: forwardRef<SVGSVGElement>((props, ref) => <MdChevronLeft {...props} />),
    ResetSearch: forwardRef<SVGSVGElement>((props, ref) => <MdClear {...props} />),
    Search: forwardRef<SVGSVGElement>((props, ref) => <MdSearch {...props} />),
    SortArrow: forwardRef<SVGSVGElement>((props, ref) => <MdArrowDownward {...props} />),
    ThirdStateCheck: forwardRef<SVGSVGElement>((props, ref) => <MdRemove {...props} />),
    ViewColumn: forwardRef<SVGSVGElement>((props, ref) => <MdViewColumn {...props} />)
};

export default tableIcons;
