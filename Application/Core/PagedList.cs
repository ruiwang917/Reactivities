using System;

namespace Application.Core;

public class PagedList<T, TCurosr>
{
    public List<T> Items { get; set; } = [];
    public TCurosr? NextCursor { get; set; }
}
