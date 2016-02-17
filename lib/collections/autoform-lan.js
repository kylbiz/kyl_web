// language translations
// Global messages
SimpleSchema._globalMessages = {
  required: "[label] 是必填项",
  minString: "[label] 至少需要 [min] 个字符",
  maxString: "[label] 不可超过 [max] 个字符",
  minNumber: "[label] 至少需要 [min]",
  maxNumber: "[label] 不可超过 [max]",
  minDate: "[label] 必须在 [min] 之后",
  maxDate: "[label] 必须在 [max] 之前",
  minCount: "必须小于 [minCount]",
  maxCount: "不可大于 [maxCount]",
  noDecimal: "[label] 必须是整数",
  notAllowed: "[value] 不是一个允许的值",
  expectedString: "[label] 必须是一个字符串",
  expectedNumber: "[label] 必须是一个数字",
  expectedBoolean: "[label] 必须是一个布尔型",
  expectedArray: "[label] 必须是一个数组",
  expectedObject: "[label] 必须是一个对象",
  expectedConstructor: "[label] 必须是一个 [type]",
  regEx: [
    {msg: "[label] failed regular expression validation"},
    {exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address"},
    {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},
    {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},
    {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},
    {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},
    {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},
    {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}
  ],
  keyNotInSchema: "[label] is not allowed by the schema"
};    